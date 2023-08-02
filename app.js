const express = require("express");
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const routes = require("./routes/mainRoutes");
require("dotenv").config();
mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Connection MongoDB sucessfull...");
  })
  .catch((err) => {
    console.log("Error while connectiong to database", err);
  });

const app = express();
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
app.listen(8000, () => {
  console.log("Server started at port 8000..");
});
