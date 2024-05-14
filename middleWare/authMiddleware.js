const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "MIE-TECH secrete", (err, decodedToken) => {
      if (err) {
        res.send({ type: "redirect" });
        console.log(err.message);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  }
};
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "MIE-TECH secrete", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        next();
      }
    });
  } else {
  }
};
module.exports = { requireAuth };
