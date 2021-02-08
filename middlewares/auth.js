const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    // auth token through token header, otherwise, it throw a message error
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Autorizado acceso");
      next();
    } else {
      throw {
        code: 403,
        status: "ACCESS_DENIED",
        message: "Missing headers token",
      };
    }
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || "ERROR", message: e.message });
  }
};

module.exports = isAuth;
