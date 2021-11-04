require("dotenv").config();
const jwt = require("jsonwebtoken");

let verifyToken = async (req, res, next) => {
  let token = req.headers.token;

  if (!token) {
    res.json({
      auth: false,
      message: "Token failed",
    });
    return;
  }

  jwt.verify(token, process.env.SECRET_WORD, (error, decoded) => {
    if (error) {
      res.json({
        auth: false,
        message: "Token failed",
      });
      return;
    } else {
      req.body.info = decoded;
      next();
    }
  });
};

module.exports = verifyToken;
