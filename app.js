const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(cookieParser());
const dbURI =
  "mongodb+srv://MIE:meyangs126@cluster0.slzl1aq.mongodb.net/Todo-app";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(5050, () => console.log("app running on port 5050..."))
  )
  .catch((err) => console.log(err));
app.use("/api", routes);
