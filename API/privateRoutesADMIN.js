const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const newseason = require("./createBBDDfuntions")

//models -->
const User = require("../MODELS/User");
const Company = require("../MODELS/Company");
const Farm = require("../MODELS/Farm");
const Machinery = require("../MODELS/Machinery");
const Season = require("../MODELS/Season");
const Tank = require("../MODELS/Tank");
const Task = require("../MODELS/Task");
const Work = require("../MODELS/Work");

//rutas -->
///home administrador:

router.get("/homeAdmin", async (req, res) => {
  // let token = req.headers.token;
  let id = req.body.info.id;
  let rol = req.body.info.rol;

  if (rol === "ADMIN") {
    try {
      info_user = await User.findOne({ _id: id });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }

    res.json({
      infoUser: info_user,
      message: "devuelve info",
    });
  } else {
    res.json({
      infoWorkUser: null,
      infoUser: null,
      message: "Error de rol",
    });
  }
});

//Ruta nueva empresa rol:ADMIN

router.post("/newcompany", async (req, res) => {
  let rol = req.body.info.rol;
  let new_company, find_company, doc;
  let { nameCompany, farms } = req.body;

  if (rol === "ADMIN") {
    try {
      find_company = await Company.findOne({ nameCompany });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }

    
    if (!find_company) {
      console.log("entra");
      new_company = { nameCompany, farms };
      
      try {
        doc = await Company.create(new_company);
      } catch (error) {
        return res.status(500).json({
          message: "Error del servidor",
        });
      }
      return res.json({
        message: "Nueva empresa creada correctamente",
      });
    } else {
      return res.json({
        message: "La empresa ya existe",
      });
    }
  }
});

//Ruta para crear nueva temporada rol:ADMIN
router.post("/newseason", async (req, res) => {
  
  let rol = req.body.info.rol;
  let new_season;
  let { name, dateINI, dateEND } = req.body;

  if (rol === "ADMIN") {
    new_season = { name, dateINI, dateEND };
    newseason(new_season,res);
  }
});

module.exports = router;
