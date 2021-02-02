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
            throw err;
          }

          res.status(200).send({ response: "Usuario create", status: "ok" });
        }
      );
    });
  } catch (e) {
    res.status(413).send({ status: "Error", message: e.message });
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
        }
      );
    });
  } catch (e) {
    res.status(413).send({ status: "Error", message: e.message });
  }
};

module.exports = controller;
