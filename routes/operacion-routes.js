const express = require("express");
const isAuth = require("../middlewares/auth");

// Importamos el middleware

const operacionController = require("../controller/operacionController");

const routes = express.Router();

routes.post("/createOperacion", isAuth, operacionController.createOperacion);
routes.get("/getOperaciones", isAuth, operacionController.getOperaciones);
routes.post("/updateOperacion", isAuth, operacionController.updateOperacion);

/* Exportamos nuestro router */

module.exports = routes;
