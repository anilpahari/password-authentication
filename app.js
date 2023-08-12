const express = require("express");
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const routes = require("./routes/mainRoutes");
const passport = require("passport");
require("./config/passport")(passport);
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
//express session middleware
app.use(
  session({
    secret: process.env.secret_msg,
    resave: true,
    saveUninitialized: true,
  })
);
//password middleware
app.use(passport.initialize());
app.use(passport.session());
//connect-flash
app.use(flash());

app.use((req, res, next) => {
  (res.locals.success_msg = req.flash("success_msg")),
    (res.locals.error_msg = req.flash("error_msg")),
    (res.locals.error = req.flash("error")),
    next();
});

app.use("/", routes);
app.listen(8000, () => {
  console.log("Server started at port 8000..");
});
