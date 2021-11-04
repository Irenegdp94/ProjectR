const express = require("express");
const router = express.Router();
//models -->
const User = require("../MODELS/User");
const Company = require("../MODELS/Company");
const Farm = require("../MODELS/Farm");
const Machinery = require("../MODELS/Machinery");
const Season = require("../MODELS/Season");
const Tank = require("../MODELS/Tank");
const Task = require("../MODELS/Task");
const Work = require("../MODELS/Work");

const jwt = require("jsonwebtoken");



//rutas -->

router.get("/getInfo",async (req, res) => {
  let idUser = req.body.info.id
  let info_user

  try {
    info_user = await Work.findOne({ worker: idUser })
    .populate("machinery")
    .populate("farm")
    .populate("tank")
    .populate("task");
    console.log(info_user)
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }

  
  res.json({
    message: "devuelve info",

  });
    
  });

  module.exports = router;