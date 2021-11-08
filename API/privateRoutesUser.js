const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

///home usuario:
router.get("/homeUser", async (req, res) => {
  // let token = req.headers.token;
  let id = req.body.info.id;
  let rol = req.body.info.rol;

  if (rol === "USER") {
    try {
      info_workUser = await Work.findOne({ worker: id });
      info_user = await User.findOne({ _id: id });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }

    res.json({
      infoWorkUser: info_workUser,
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

//Ruta trabajos usuario localhost:5000/api/user/userworks
router.get("/userworks", async (req, res) => {
  let id = req.body.info.id;
  let rol = req.body.info.rol;
  let info_workUser;
  if (rol === "USER") {
    try {
      info_workUser = await Work.findOne({ worker: id })
        .populate("farm", "nameFarm")
        .populate("task", "nameTask")
        .populate("machinery", "nameMachinery")
        .populate("tank", "nameTank");
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }

    res.json({
      infoWorkUser: info_workUser,
      message: "info de trabajos",
    });
  } else {
    res.json({
      infoWorkUser: null,
      message: "Error de rol",
    });
  }
});


//Ruta nuevo trabajo rol: USER  localhost:5000/api/user/nework
// router.post("/nework", async (req, res) => {
//   let { dateINI, dateFIN, farm, worker, task, machinery, tank, litres_tank, description  } = req.body;
//  let doc;
//   let products= [
//     {    
//       name_pr,
//       litres
//     }
//   ];

//  let nework = {dateINI, dateFIN, farm, worker, task, machinery, tank, litres_tank, products, description};

//       try {
//         doc = await Work.create(nework);
//         console.log(doc);
//       } catch (error) {
//         return res.status(500).json({
//           message: "Error del servidor",
//         });
//       }
//       res.json({
//         message: "Trabajo creado correctamente",
//         info_work: doc

//       });
// }








module.exports = router;
