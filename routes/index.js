const operacionRoutes = require("./operacion-routes");
const usuarioRoutes = require("./usuario-routes");

// users and admins

module.exports = (app) => {
  app.use("/usuario", usuarioRoutes);
  app.use("/operacion", operacionRoutes);
};
