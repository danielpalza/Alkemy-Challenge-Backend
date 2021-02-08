const jwt = require("jsonwebtoken");

const controller = {};

controller.createUser = (req, res) => {
  try {
    req.getConnection((err, conn) => {
      const { email, password } = req.body;
      conn.query(
        `INSERT INTO usuario (email, password) VALUES ( "${email}", "${password}" )`,
        (err, rows) => {
          if (err) {
            res.status(413).send({ status: "Error" });
          } else {
            res.status(200).send({ message: "Usuario creado", status: "ok" });
          }
        }
      );
    });
  } catch (e) {
    res
      .status(413)
      .send({ status: "Error", message: "Ocurrio un error al registrar" });
  }
};

controller.login = (req, res) => {
  try {
    req.getConnection((err, conn) => {
      const { email, password } = req.body;

      conn.query(
        `SELECT id_usuario FROM usuario WHERE email="${email}" AND password="${password}"`,
        (err, id) => {
          if (err) {
            throw err;
          }

          if (id.length > 0) {
            const token = jwt.sign(
              { id: id[0].id_usuario },
              process.env.JWT_SECRET,
              {
                expiresIn: 60 * 60,
              }
            );

            res
              .status(200)
              .send({ response: { token, expiresIn: 60 * 60 }, status: "ok" });
          } else {
            res
              .status(413)
              .send({ status: "Error", message: "Usuario no encontrado" });
          }
        }
      );
    });
  } catch (e) {
    res
      .status(413)
      .send({ status: "Error", message: "Ocurrio un error al iniciar sesión" });
  }
};

controller.auth = (req, res) => {
  try {
    const { token } = req.headers;

    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const decode = jwt.decode(token);

      const newToken = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
      });

      res
        .status(200)
        .send({
          response: { token: newToken, expiresIn: 60 * 60 },
          status: "ok",
        });
    } else {
      throw {
        code: 403,
        status: "ACCESS_DENIED",
        message: "Error de token",
      };
    }
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || "ERROR", message: "Error de token" });
  }
};

module.exports = controller;
