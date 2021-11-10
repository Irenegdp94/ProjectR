//Rutas privadas de ADMIN
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const newseason = require("./createBBDDfuntions");

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
///home administrador:
router.get("/homeAdmin", async (req, res) => {
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
    if(info_user){
      res.json({
        infoUser: info_user,
        message: "devuelve info",
      });
    }else {
      res.json({
        infoUser: null,
        message: "El usuario no existe",
      });
    }
    
  } else {
    res.json({
      infoWorkUser: null,
      infoUser: null,
      message: "Error de rol",
    });
  }
});
//Rutas para crear elementos en las BBDD -->
//Ruta nueva empresa rol:ADMIN
router.post("/newcompany", async (req, res) => {
  let rol = req.body.info.rol;
  let new_company, find_company;
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
      let farms_id = [];
      for (element in farms) {
        try {
          info_farm = await Farm.findOne({ nameFarm: farms[element] });
          console.log(info_farm);
        } catch (error) {
          return res.status(500).json({
            message: "Error de conexión",
          });
        }

        if (info_farm) {
          farms_id.push(info_farm._id);
        }
      } //end for

      new_company = { nameCompany, farms: farms_id };

      try {
        let doc = await Company.create(new_company);
        return res.json({
          message: "Nueva empresa creada correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error del servidor",
        });
      }
    } else {
      return res.json({
        message: "La empresa ya existe",
      });
    }
  } else {
    return res.json({
      message: "Error de rol",
    });
  }
});

//Ruta para crear nueva temporada rol:ADMIN
router.post("/newseason", async (req, res) => {
  let rol = req.body.info.rol;
  let new_season;
  let { name, dateINI, dateEND } = req.body;

  if (rol === "ADMIN") {
    new_season = { name, dateINI, dateEND };
    newseason(name, new_season, res);
  } else {
    return res.json({
      message: "Error de rol",
    });
  }
});

//Ruta para crear nueva finca
router.post("/newfarm", async (req, res) => {
  let rol = req.body.info.rol;
  if (rol === "ADMIN") {
    let find_farm;
    let { nameFarm, area, cultivo, nom_season, nom_company } = req.body;
    let season_id, info_season;
    let company_id, info_company;

    try {
      find_farm = await Farm.findOne({ nameFarm });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }

    if (!find_farm) {
      try {
        info_season = await Season.findOne({ name: nom_season });
        info_company = await Company.findOne({ nameCompany: nom_company });
      } catch (error) {
        return res.status(500).json({
          message: "Error de conexión",
        });
      }

      if (info_season) {
        season_id = info_season._id;
      }

      if (info_company) {
        company_id = info_company._id;
      }

      new_farm = {
        nameFarm,
        area,
        cultivo,
        season: season_id,
        company: company_id,
      };

      try {
        doc = await Farm.create(new_farm);
        return res.json({
          message: "Nueva finca creada correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error del servidor",
        });
      }
    } else {
      return res.json({
        message: "La finca ya existe",
      });
    }
  } else {
    return res.json({
      message: "Error de rol",
    });
  }
});

//Ruta para crear maquinaria
router.post("/newmachinery", async (req, res) => {
  let rol = req.body.info.rol;
  if (rol === "ADMIN") {
    let find_machinery, doc;
    let { nameMac, nREF, datePurchase, pricePur, priceH } = req.body;
    try {
      find_machinery = await Machine.findOne({ nameMachinery: nameMac });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    if (!find_machinery) {
      let new_machinery = {
        nameMachinery: nameMac,
        nREF,
        datePurchase,
        pricePurchase: pricePur,
        priceH,
      };

      try {
        doc = await Machine.create(new_machinery);
        return res.json({
          message: "Nueva maquinaria creada correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error del servidor",
        });
      }
    } else {
      return res.json({
        message: "La maquinaria ya existe",
      });
    }
  } else {
    return res.json({
      message: "Error de rol",
    });
  }
});

//Ruta para crear nuevo deposito
router.post("/newtank", async (req, res) => {
  let rol = req.body.info.rol;
  if (rol === "ADMIN") {
    let find_tank, doc;
    let { nameTank, capacity, currentLitres } = req.body;
    try {
      find_tank = await Tank.findOne({ nameTank });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    if (!find_tank) {
      let new_tank = { nameTank, capacity, currentLitres };
      try {
        doc = await Tank.create(new_tank);
        return res.json({
          message: "Nuevo depósito creado correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error del servidor",
        });
      }
    } else {
      return res.json({
        message: "El depósito ya existe",
      });
    }
  } else {
    return res.json({
      message: "Error de rol",
    });
  }
});

//Ruta para crear nuevas tareas
router.post("/newtask", async (req, res) => {
  let rol = req.body.info.rol;
  if (rol === "ADMIN") {
    let find_task;
    let { nomTask, cat } = req.body;
    try {
      find_task = await Task.findOne({ nameTask: nomTask });
      console.log(find_task);
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
    if (!find_task) {
      try {
        let doc;
        doc = await Task.create({ nameTask: nomTask, category: cat });
        return res.json({
          message: "Nueva tarea creada correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          message: error,
        });
      }
    } else {
      return res.json({
        message: "La tarea ya existe",
      });
    }
  } else {
    return res.json({
      message: "Error de rol",
    });
  }
});

module.exports = router;
