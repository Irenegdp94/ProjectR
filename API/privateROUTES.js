//Rutas comunes a USER y ADMIN (crear nuevo trabajo)
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

router.get("/validate", (req, res) => {
  res.json({
    auth: true,
    message: "Token has been validated",
  });
});

//Crear nuevo trabajo (admin y user)
router.post("/newwork", async (req, res) => {
  let rol = req.body.info.rol;
  let {
    dateINI,
    dateFIN,
    farm,
    company,
    task,
    machinery,
    tank,
    litres_tank,
    products,
    description,
  } = req.body;
// console.log(req.body)
  // let info_farm, info_task, info_machinery, info_tank;
  // let id_farms = [];
  // let id_companies = [];
  // let products = [];
  // let id_machinery = [];
  // let id_task, id_tank;
  let id_worker;
  // let id_farm;
  //añadir fincas
  // for (element in nom_farms) {
  //   try {
  //     info_farm = await Farm.findOne({ nameFarm: nom_farms[element] });
  //     id_farm = info_farm._id;
  //     info_company = await Company.findOne({ farms: id_farm });
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: "Error de conexión",
  //     });
  //   }
  //   if (info_farm) {
  //     id_farms.push(info_farm._id);
  //     id_companies.push(info_company._id);
  //   }
  // }

  //añadir tarea
  // try {
  //   info_task = await Task.findOne({ nameTask: nom_task });
  // } catch (error) {
  //   return res.status(500).json({
  //     message: "Error de conexión",
  //   });
  // }
  // if (info_task) {
  //   id_task = info_task._id;
  // }

  //añadir maquinaria
  // for (element in nom_machinerys) {
  //   try {
  //     info_machinery = await Machine.findOne({
  //       nameMachinery: nom_machinerys[element],
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: "Error de conexión",
  //     });
  //   }
  //   if (info_machinery) {
  //     id_machinery.push(info_machinery._id);
  //   }
  // }

  // //añadir deposito
  // try {
  //   info_tank = await Tank.findOne({ nameTank: nom_tank });
  // } catch (error) {
  //   return res.status(500).json({
  //     message: "Error de conexión",
  //   });
  // }
  // if (info_tank) {
  //   id_tank = info_tank._id;
  // }

  //añadir productos
  // for (element in nom_products) {
  //   let namepr = nom_products[element];
  //   let litrepr = litres_products[element];
  //   let new_element = { name_pr: namepr, litres: litrepr };
  //   products[element] = new_element;
  // }

  //trabajador
  if (rol === "ADMIN") {
    id_worker = req.body.worker;
  } else if (rol === "USER") {
    id_worker = req.body.info.id;
  }

  // crear trabajo en bbdd
  let new_work = {
    dateINI,
    dateFIN,
    farm,
    company,
    worker: id_worker,
    task,
    machinery,
    tank,
    litres_tank,
    products,
    description,
  };
  // console.log(new_work)
  try {
    let doc;
    doc = await Work.create(new_work);
    return res.json({
      success: true,
      message: "Nuevo trabajo creado correctamente",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error servidor",
    });
  }
  
});

//MODIFICAR
////Usuario (ADMIN y USER)
router.put("/upuser/:iduser", async (req, res) => {
  let rol = req.body.info.rol;
  let id_user = req.params.iduser;
  let { nUser, nameUser, surnameUser, phone, roleUser } = req.body;
  let doc_rep = await User.find({ nUser: nUser });

  if (doc_rep.length === 1 && doc_rep[0]._id == id_user) {
    if (!nUser || !nameUser || !surnameUser || !roleUser) {
      return res.json({
        success: false,
        message: "Introduce todos los datos",
        nUser: null,
        nameUser: null,
        surnameUser: null,
        pass: null,
        phone: null,
        roleUser: null,
      });
      // }
      // else if (nUser.length != 9) {
      //   //cambiar para comprobar DNI
      //   res.json({
      //     success: false,
      //     message: "El número de usuario debe tener 8 digitos + letra",
      //     nUser: null,
      //     nameUser: null,
      //     surnameUser: null,
      //     pass: null,
      //     phone: null,
      //     roleUser: null,
      //   });
      // } else if(){
    } else {
      if (rol === "ADMIN") {
        let doc = await User.findByIdAndUpdate(
          id_user,
          {
            nUser,
            nameUser,
            surnameUser,
            phone,
            roleUser,
          },
          { new: true }
        );
        // console.log("doc",doc)
        res.json({
          success: true,
          message: "Usuario modificado correctamente",
          nUser: nUser,
          nameUser: nameUser,
          surnameUser: surnameUser,
          pass: null,
          phone: phone,
          roleUser: roleUser,
        });
      } else if (rol === "USER") {
        let { pass } = req.body;
        if (pass.length < 8) {
          //comprobar si la contraseña es buena
          res.json({
            success: false,
            message: "La contraseña es demasiado corta",
            nUser: null,
            nameUser: null,
            surnameUser: null,
            pass: null,
            phone: null,
            roleUser: null,
          });
        }
        let doc = await User.findByIdAndUpdate(
          id_user,
          {
            nameUser,
            surnameUser,
            phone,
            password:pass,
          },
          { new: true }
        );

        res.json({
          success: true,
          message: "Usuario modificado correctamente",
          nUser: nUser,
          nameUser: nameUser,
          surnameUser: surnameUser,
          pass: pass,
          phone: phone,
          roleUser: roleUser,
        });
      }
    }
  }else{
    res.json({
      success: false,
      message: "El usuario ya existe",
      nUser: null,
      nameUser: null,
      surnameUser: null,
      pass: null,
      phone: null,
      roleUser: null,
    });
  }
});

//modificar TRABAJO (USER y ADMIN)
router.put("/upwork/:idwork", async (req, res) => {
  let rol = req.body.info.rol;
  let id_user = req.body.info.id;
  let id_work = req.params.idwork;
  let {
    UPdateINI,
    UPdateFIN,
    UPfarm,
    UPtask,
    UPmachinery,
    UPtank,
    UPlitres_tank,
    UPdescription,
    UPproducts, //array de objetos
  } = req.body;

  if (UPfarm) {
    let id_farms = [];
    for (element in UPfarm) {
      id_farm = await Farm.findOne({ nameFarm: UPfarm[element] });
      id_farms.push(id_farm);
    }
    UPfarm = id_farms;
  }

  if (UPtask) {
    UPtask = await Task.findOne({ nameTask: UPtask });
  }

  if (UPmachinery) {
    let id_machines = [];
    for (element in UPmachinery) {
      id_machine = await Machine.findOne({
        nameMachinery: UPmachinery[element],
      });
      id_machines.push(id_machine);
    }
    UPmachinery = id_machines;
  }

  if (UPtank) {
    UPtank = await Tank.findOne({ nameTank: UPtank });
  }

  if (rol === "ADMIN") {
    let UPworker = req.body.worker;

    let doc = await Work.findByIdAndUpdate(
      id_work,
      {
        dateINI: UPdateINI,
        dateFIN: UPdateFIN,
        farm: UPfarm,
        worker: UPworker,
        task: UPtask,
        machinery: UPmachinery,
        tank: UPtank,
        litres_tank: UPlitres_tank,
        products: UPproducts,
        description: UPdescription,
      },
      { new: true }
    );
    res.json({
      message: "Trabajo modificado",
      up_info: doc,
    });
  } else if (rol === "USER") {
    let doc = await Work.findOneAndUpdate(
      { _id: id_work, worker: id_user },
      {
        dateINI: UPdateINI,
        dateFIN: UPdateFIN,
        farm: UPfarm,
        task: UPtask,
        machinery: UPmachinery,
        tank: UPtank,
        litres_tank: UPlitres_tank,
        products: UPproducts,
        description: UPdescription,
      },
      { new: true }
    );
    res.json({
      message: "Trabajo modificado",
      up_info: doc,
    });
  }
});

module.exports = router;
