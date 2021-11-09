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

//crear nueva temporada rol:ADMIN

async function newSeason (name,new_season,res) {
  try {
    find = await Season.findOne({ name });
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  if(!find){
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
  }else{
    return res.json({
      message: "La temporada ya existe",
    });
  }
  
};













module.exports = newSeason;