const express = require("express");
const router = express.Router();
const User = require("../MODELS/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

router.post("/login", async (req, res) => {
  let nom = req.body.nom;
  let pass = req.body.pass;
  let info_user;

  try {
    info_user = await User.find({ nameUser: nom });
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  if (info_user.length == 0) {
    return res.status(403).json({
      message: "Usuario no encontrado",
    });
  }

  bcrypt.compare(pass, info_user[0].password, (err, result) => {
    if (result == true) {
      res.json({
        auth: true,
        message: "Log-in correcto",
        userName: info_user[0].nameUser,
        userNumber: info_user[0].nUser,
        userID: info_user[0]._id,
        userRole: info_user[0].roleUser,
      });
      return;
    } else if (result == false) {
      res.status(403).json({
        auth: false,
        message: "Usuario o contraseña incorrecto",
        userName: null,
        userNumber: null,
        userID: null,
        userRole: null,
      });
      return;
    }
  });
});

router.get("/testing", (req, res) => {
  res.status(200).json({
    text: "Testing",
  });
});

module.exports = router;
