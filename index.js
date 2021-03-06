const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");
const routes = require("./routes/index");

let corsOptions = {
 
  preflightContinue: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

//Settings
dotenv.config();
const app = express();
app.use(cors(corsOptions));

app.set("port", process.env.PORT || 4000);

//DB Connection
app.use(db);

//Middleware
app.use(bodyParser.json());

//Routes
routes(app);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
