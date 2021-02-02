const jwt = require("jsonwebtoken");

const controller = {};

controller.createOperacion = (req, res) => {
  try {
    req.getConnection((err, conn) => {
      const { tipo, concepto, monto, fecha } = req.body;
      const { token } = req.headers;

      const decode = jwt.decode(token);

      conn.query(
        `INSERT INTO operacion (id_usuario, tipo, concepto, monto, fecha) VALUES (${decode.id}, "${tipo}", "${concepto}", ${monto}, "${fecha}")`,
        (err, rows) => {
          if (err) {
            throw err;
          }
          res.status(200).send({ response: "Operacion create", status: "ok" });
        }
      );
    });
  } catch (e) {
    res.status(413).send({ status: "Error", message: e.message });
  }
};

controller.getOperaciones = (req, res) => {
  try {
    req.getConnection((err, conn) => {
      const { token } = req.headers;

      const decode = jwt.decode(token);
      console.log("decode:", decode);
      conn.query(
        `SELECT * FROM operacion WHERE id_usuario=${decode.id} `,
        (err, rows) => {
          if (err) {
            throw err;
          }
          res.status(200).send({ response: rows, status: "ok" });
        }
      );
    });
  } catch (e) {
    res.status(413).send({ status: "Error", message: e.message });
  }
};

controller.updateOperacion = (req, res) => {
  try {
    req.getConnection((err, conn) => {
      const { concepto, monto, fecha, idOperacion } = req.body;
      const { token } = req.headers;

      const decode = jwt.decode(token);

      conn.query(
        `UPDATE operacion SET concepto="${concepto}", monto=${monto}, fecha="${fecha}" WHERE id_usuario=${decode.id} AND id_operacion=${idOperacion} `,
        (err, rows) => {
          if (err) {
            throw err;
          }
          res.status(200).send({ response: "Update completed", status: "ok" });
        }
      );
    });
  } catch (e) {
    res.status(413).send({ status: "Error", message: e.message });
  }
};

module.exports = controller;
