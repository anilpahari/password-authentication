const express = require("express");
const loginUser = require("../controllers/loginControllers");
const registerUser = require("../controllers/registerControllers");
const homePage = require("../controllers/homeControllers");
const routes = express.Router();
routes.get("/", homePage);
routes.get("/users/login", loginUser);
routes.get("/users/register", registerUser);

module.exports = routes;
