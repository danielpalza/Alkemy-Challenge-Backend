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
        `SELECT * FROM operacion WHERE id_usuario=${decode.id} ORDER BY id_operacion DESC LIMIT 10 `,
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
      const { concepto, monto, fecha, id_operacion } = req.body;
      const { token } = req.headers;

      const decode = jwt.decode(token);

      conn.query(
        `UPDATE operacion SET concepto="${concepto}", monto=${monto}, fecha="${fecha}" WHERE id_usuario=${decode.id} AND id_operacion=${id_operacion} `,
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

controller.deleteOperacion = (req, res) => {
  try {
    req.getConnection((err, conn) => {
      const { id_operacion } = req.body;
      const { token } = req.headers;

      const decode = jwt.decode(token);

      conn.query(
        `DELETE FROM operacion WHERE id_usuario=${decode.id} AND id_operacion=${id_operacion} `,
        (err, rows) => {
          if (err) {
            throw err;
          }
          res.status(200).send({ response: "Delete completed", status: "ok" });
        }
      );
    });
  } catch (e) {
    res.status(413).send({ status: "Error", message: e.message });
  }
};

controller.balance = (req, res) => {
  try {
    req.getConnection((err, conn) => {
      const { token } = req.headers;

      const decode = jwt.decode(token);

      conn.query(
        `SELECT SUM(CASE WHEN tipo = 'Ingreso' THEN monto ELSE 0 END) - SUM(CASE WHEN tipo = 'Egreso' THEN monto ELSE 0 END) BALANCE FROM operacion WHERE id_usuario=${decode.id}`,
        (err, rows) => {
          if (err) {
            throw err;
          }
          res.status(200).send({ response: rows[0].BALANCE, status: "ok" });
        }
      );
    });
  } catch (e) {
    res.status(413).send({ status: "Error", message: e.message });
  }
};


module.exports = controller;
