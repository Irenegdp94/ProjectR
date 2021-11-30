//Rutas privadas de ADMIN
const express = require("express");
const router = express.Router();

//models -->
const User = require("../MODELS/User");
const Company = require("../MODELS/Company");
const Farm = require("../MODELS/Farm");
const Machine = require("../MODELS/Machine");
const Season = require("../MODELS/Season");
const Tank = require("../MODELS/Tank");
const Task = require("../MODELS/Task");
const Work = require("../MODELS/Work");
const Product = require("../MODELS/Product");

////Fincas
router.get("/sfarms", async (req, res) => {
  // {"nameFarm": {$regex: /ra/i} }
  let { caracter } = req.body;
  // let regex = new RegExp(caracter, 'i');
  let info_;
  // , nameFarm: {$regex:regex}
  try {
    info_ = await Farm.find(
      { delete: false },
      { works: 0, deleted: 0, area: 0, cultivo: 0, season: 0 }
    ).populate("company", "nameCompany");
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  res.json({
    info: info_,
    message: "info de fincas",
  });
});

////Campañas
router.get("/sseassons", async (req, res) => {
  let info_;
  try {
    info_ = await Season.find(
      { delete: false },
      { works: 0, deleted: 0}
    );
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  res.json({
    info: info_,
    message: "info de fincas",
  });
});

////Empresas
router.get("/scompany", async (req, res) => {
  let info_;
  try {
    info_ = await Company.find(
      { delete: false },
      { works: 0, deleted: 0}
    );
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  res.json({
    info: info_,
    message: "info de fincas",
  });
});

module.exports = router;
