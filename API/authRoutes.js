//Rutas de login y signUp
const express = require("express");
const router = express.Router();
const User = require("../MODELS/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  let { nUser, pass } = req.body;
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
      message: "Número de usuario no encontrado",
    });
  }

  bcrypt.compare(pass, info_user.password, (err, result) => {
    if (result == true) {
      let token = jwt.sign(
        { id: info_user._id, rol: info_user.roleUser },
        process.env.SECRET_WORD,
        { expiresIn: "1h" }
      );
      res.json({
        auth: true,
        message: "Log-in correcto",
        token: token,
      });
      return;
    } else if (result == false) {
      res.status(403).json({
        auth: false,
        message: "Usuario o contraseña incorrecto",
        token: null,
      });
      return;
    }
  });
});

router.post("/signup", async (req, res) => {
  let { nUser, nameUser, surnameUser, pass, phone, roleUser, works } = req.body;
  let user_found;

  if (!roleUser) {
    return res.status(403).json({
      message: "Introduce todos los datos",
      nUser: null,
      nameUser: null,
      surnameUser: null,
      pass: null,
      phone: null,
      roleUser: null,
    });
  }

  try {
    user_found = await User.find({ nUser: nUser });
  } catch (error) {
    return res.status(500).json({
      message: "error conexion",
    });
  }

  if (user_found.length != 0) {
    return res.json({
      message: "El usuario ya existe",
      nUser: null,
      nameUser: null,
      surnameUser: null,
      pass: null,
      phone: null,
      roleUser: null,
    });
  } else {
    if (pass.length < 8) {
      //comprobar si la contraseña es buena
      res.json({
        message: "La contraseña es demasiado corta",
        nUser: null,
        nameUser: null,
        surnameUser: null,
        pass: null,
        phone: null,
        roleUser: null,
      });
    } else if (nUser.length != 9) {
      res.json({
        message: "El número de usuario debe tener 8 digitos + letra",
        nUser: null,
        nameUser: null,
        surnameUser: null,
        pass: null,
        phone: null,
        roleUser: null,
      });
    } else if (!roleUser === "USER" || !roleUser === "ADMIN") {
      res.json({
        message: "El rol de usuario debe ser USER o ADMIN",
        nUser: null,
        nameUser: null,
        surnameUser: null,
        pass: null,
        phone: null,
        roleUser: null,
      });
    } else {
      //crear usuario
      let doc;
      let cryp_pass = bcrypt.hashSync(pass, salt);
      let newUser = {
        nUser,
        nameUser,
        surnameUser,
        password: cryp_pass,
        phone,
        roleUser,
        works: [],
      };
      try {
        doc = await User.create(newUser);
        console.log(doc);
      } catch (error) {
        return res.status(500).json({
          message: "Error del servidor",
        });
      }
      res.json({
        message: "Usuario creado correctamente",
        nUser: nUser,
        nameUser: nameUser,
        surnameUser: surnameUser,
        pass: cryp_pass,
        phone: phone,
        roleUser: roleUser,
      });
    }
  }
});

module.exports = router;
