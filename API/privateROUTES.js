//crear nuevo trabajo (usuario y admin)
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//models -->
const User = require("../MODELS/User");
const Company = require("../MODELS/Company");
const Farm = require("../MODELS/Farm");
const Machine = require("../MODELS/Machine");
const Season = require("../MODELS/Season");
const Tank = require("../MODELS/Tank");
const Task = require("../MODELS/Task");
const Work = require("../MODELS/Work");

//rutas -->
//Crear nuevo trabajo (admin y user)
router.post("/newwork", async (req, res) => {
  let rol = req.body.info.rol;
  let {
    dateINI,
    dateFIN,
    nom_farms,
    nom_task,
    nom_machinerys,
    nom_tank,
    litres_tank,
    nom_products,
    litres_products,
    description,
  } = req.body;

  let info_farm, info_task, info_machinery, info_tank;
  let id_farms = [];
  let products = [];
  let id_machinery = [];
  let id_task, id_tank;
  let id_worker;

  //añadir fincas
  for (element in nom_farms) {
    try {
      info_farm = await Farm.findOne({ nameFarm: nom_farms[element] });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    if (info_farm) {
      id_farms.push(info_farm._id);
    }
  }
  //añadir tarea
  try {
    info_task = await Task.findOne({ nameTask: nom_task });
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  if (info_task) {
    id_task = info_task._id;
  }

  //añadir maquinaria
  for (element in nom_machinerys) {
    try {
      info_machinery = await Machine.findOne({
        nameMachinery: nom_machinerys[element],
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    if (info_machinery) {
      id_machinery.push(info_machinery._id);
    }
  }

  // //añadir deposito
  try {
    info_tank = await Tank.findOne({ nameTank: nom_tank });
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }
  if (info_tank) {
    id_tank = info_tank._id;
  }

  //añadir productos
  for (element in nom_products) {
    let namepr = nom_products[element];
    let litrepr = litres_products[element];
    let new_element = { name_pr: namepr, litres: litrepr };
    products[element] = new_element;
  }

//trabajador
  if (rol === "ADMIN") {
    id_worker = req.body.id_worker;
  } else if (rol === "USER") {
    id_worker = req.body.info.id;
  }


  // crear trabajo en bbdd
  let new_work = {
    dateINI,
    dateFIN,
    farm: id_farms,
    worker: id_worker,
    task: id_task,
    machinery: id_machinery,
    tank: id_tank,
    litres_tank,
    products,
    description,
  };
  try {
    let doc;
    doc = await Work.create(new_work);
    return res.json({
      message: "Nuevo trabajo creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
