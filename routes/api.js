const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  //validation
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "MIE-TECH secrete", {
    expiresIn: maxAge,
  });
};

router.get("/", (req, res) => {
  res.send({ type: "Powered by MIE-TECH" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({});
  }
  res.send({ type: "login request" });
});
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});
// router.post("/", (req, res) => {
//   res.send({ type: "logout request" });
// });
module.exports = router;
