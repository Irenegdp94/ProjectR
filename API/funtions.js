//FUNCIONES:
const express = require("express");
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
const Product = require("../MODELS/Product");

//crear nueva temporada rol:ADMIN
async function newseason(name, new_season, res) {
  try {
    find = await Season.findOne({ name });
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión bbdd:season",
    });
  }
  if (!find) {
    try {
      doc = await Season.create(new_season);
    } catch (error) {
      return res.status(500).json({
        message: "Error del servidor bbdd:season",
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

// const view_x = async (info_x, X, res) => {
//   let array_keys, variable;

//   try {
//     info_x = await X.find({ delete: false }, { works: 0, deleted: 0 });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error de conexión",
//     });
//   }
//   // info_x_JSON = info_x[0].toJSON();
//   // info_x_JSON = info_x[0].toObject()
//   // console.log("info_x_JSON --> ",info_x_JSON)
//   // array_keys = Object.keys(info_x_JSON);
//   // console.log(array_keys);
//   // for(element in array_keys){
//      // console.log(array_keys[element],"-->",info_x_JSON[array_keys[element]])
//     // console.log(array_keys[element],"type-->",typeof(info_x_JSON[array_keys[element]]))
//     // console.log(JSON.stringify(info_x_JSON, null, '\t'));
//   // }
  
//   return info_x;
// };

// borrado falso
const deleteOneX = async (ModelX, idX, res) => {
  let info_X;
  try {
    info_X = await ModelX.findByIdAndUpdate(idX, { deleted: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  return info_X;
};

module.exports = { newseason, deleteOneX };
// module.exports = view_x;
// module.exports = deleteOneX;
