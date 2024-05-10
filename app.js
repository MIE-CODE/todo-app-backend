const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors("*"));
const dbURI =
  "mongodb+srv://MIE:meyangs126@cluster0.slzl1aq.mongodb.net/Todo-app";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(5050, () => console.log("app running on port 5050..."))
  )
  .catch((err) => console.log(err));
app.use("/api", routes);
//cookies
app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send({ type: "you got the cookies" });
});
app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});
