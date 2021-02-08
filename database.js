const mysql = require("mysql");
const myConnection = require("express-myconnection");

//Database Connection
const dbOptions = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "administracion",
};

//First time table create

connection = mysql.createConnection(dbOptions);

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  let createUsuario = `create table if not exists usuario (
                            id_usuario int primary key auto_increment not null ,
                            email varchar(255) not null,
                            password varchar(255) not null,
							UNIQUE KEY unique_email(email) 
                        )`;

  let createOperacion = `create table if not exists operacion (
                            id_operacion int primary key auto_increment not null,
                            id_usuario int not null,
                            tipo varchar(255) not null,
                            concepto varchar(255) not null,
                            monto int not null,
                            fecha varchar(255) not null
                                                    )`;

  connection.query(createUsuario, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.query(createOperacion, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
});
module.exports = myConnection(mysql, dbOptions, "single");
