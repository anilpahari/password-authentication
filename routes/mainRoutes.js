const express = require("express");
const loginUser = require("../controllers/loginControllers");
const homePage = require("../controllers/homeControllers");
const viewregisterUser = require("../controllers/registerControllers");
const registerUser = require("../controllers/registerpostContoller");
const postUser = require("../controllers/loginPostControllers");
const dashboard = require("../controllers/dashboard");
const logoutUser = require("../controllers/logoutControllers");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const routes = express.Router();
routes.get("/", forwardAuthenticated, homePage);
routes.get("/users/login", loginUser);
routes.get("/users/register", viewregisterUser);
routes.post("/users/register", registerUser);
routes.post("/users/login", postUser);
routes.get("/dashboard", ensureAuthenticated, dashboard);
routes.get("/users/logout", logoutUser);
module.exports = routes;
