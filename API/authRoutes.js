const express = require("express");
const router = express.Router();
const User = require("../MODELS/User");
const bcrypt = require("bcrypt");
//const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  let {nUser, pass} = req.body;
  let info_user;


  try {
    info_user = await User.findOne({ nUser: nUser });
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  if (!info_user) {
    return res.status(403).json({
      message: "Usuario no encontrado",
    });
  }

  bcrypt.compare(pass, info_user.password, (err, result) => {
    if (result == true) {
      let token = jwt.sign({id:info_user._id }, process.env.SECRET_WORD, {expiresIn:"1h"});
      res.json({
        auth: true,
        message: "Log-in correcto",
        userRole: info_user.roleUser,
        token: token
      });
      return;
    } else if (result == false) {
      res.status(403).json({
        auth: false,
        message: "Usuario o contraseña incorrecto",
        userRole: null,
        token: null
      });
      return;
    }
  });
});



module.exports = router;
