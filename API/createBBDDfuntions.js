//Rutas para crear elementos en BBDD
const express = require("express");
//const router = express.Router();
const jwt = require("jsonwebtoken");
///models -->
const User = require("../MODELS/User");
const Company = require("../MODELS/Company");
const Farm = require("../MODELS/Farm");
const Machine = require("../MODELS/Machine");
const Season = require("../MODELS/Season");
const Tank = require("../MODELS/Tank");
const Task = require("../MODELS/Task");
const Work = require("../MODELS/Work");
//const { default: mongooseAutoPopulate } = require("mongoose-autopopulate");

//crear nueva temporada rol:ADMIN

async function newSeason(name, new_season, res) {
  try {
    find = await Season.findOne({ name });
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  if (!find) {
    try {
      doc = await Season.create(new_season);
    } catch (error) {
      return res.status(500).json({
        message: "Error del servidor",
      });
    }
    return res.json({
      message: "Nueva temporada creada correctamente",
    });
  } else {
    return res.json({
      message: "La temporada ya existe",
    });
  }
}

const view_x = async (info_x, X, res) => {
  
  try {
    info_x = await X.find({},{works:0});
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }

  return info_x;
};

//borrado falso
const deleteOneX = async (ModelX, idX) => {
  try {
    info_X = await ModelX.findByIdAndUpdate(idX, {deleted:true})
    } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
};
//return info_X
};



// const view_Onex = async (info_Onex,X,id_x,res) => {
//   try {
//     info_Onex = await X.findOne({_id: id_x},{works:0});
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error de conexión",
//     });
//   }
//   return info_Onex
// }






module.exports = newSeason;
module.exports = view_x;
module.exports = deleteOneX;
//module.exports = view_Onex;

