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
router.get("/newwork", async (req, res) => {
    let rol = req.body.info.rol;
    let {dateINI,dateFIN, nom_farm,nom_task,nom_machinery,nom_tank,litres_tank,nom_products,description} = req.body
    if (rol === "ADMIN") {
        let num_worker = req.body
        let info_farm;

        //añadir fincas
        let id_farm = [];
        for (element in nom_farm) {
        try {
          info_farm = await Farm.findOne({ nUser: num_worker });
          
        } catch (error) {
          return res.status(500).json({
            message: "Error de conexión",
          });
        }

        if (info_farm) {
            id_farm.push(info_farm._id);
        }
      } //end for

//añadir trabajador
try {
    info_worker = await User.findOne({ nameFarm: nom_farm[element] });
    
  } catch (error) {
    return res.status(500).json({
      message: "Error de conexión",
    });
  }

  if (info_farm) {
      id_farm.push(info_farm._id);
  }






        let new_work = {dateINI,dateFIN,farm:id_farm,worker:id_worker,task:id_task,machinery:id_machinery,tank:id_tank,litres_tank,products:id_products,description}


    }else if (rol === "USER"){
        let worker = req.body.info.id

    }
}