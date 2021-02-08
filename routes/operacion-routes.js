const express = require("express");
const isAuth = require("../middlewares/auth");

// Importamos el middleware

const operacionController = require("../controller/operacionController");

const routes = express.Router();

routes.post("/createOperacion", isAuth, operacionController.createOperacion);
routes.get("/getOperaciones", isAuth, operacionController.getOperaciones);
routes.post("/updateOperacion", isAuth, operacionController.updateOperacion);
routes.post("/deleteOperacion", isAuth, operacionController.deleteOperacion);
routes.get("/getBalance", isAuth, operacionController.balance);

/* Exportamos nuestro router */

module.exports = routes;
