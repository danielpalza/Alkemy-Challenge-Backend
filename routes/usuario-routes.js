const express = require("express");

// Importamos el middleware

const usuarioController = require("../controller/usuarioController");

const routes = express.Router();

routes.post("/createUser", usuarioController.createUser);
routes.post("/login", usuarioController.login);

/* Exportamos nuestro router */

module.exports = routes;
