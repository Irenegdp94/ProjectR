//Rutas privadas de ADMIN
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const functions = require("./funtions");

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

//rutas -->
///home administrador:
router.get("/homeAdmin", async (req, res) => {
  let id = req.body.info.id;
  let rol = req.body.info.rol;

  if (rol === "ADMIN") {
    try {
      info_user = await User.findOne(
        { _id: id },
        { password: 0, deleted: 0, works: 0 }
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión bbdd: USER",
      });
    }
    if (info_user) {
      res.json({
        infoUser: info_user,
        message: "devuelve info",
      });
    } else {
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
//cambiar para coger directamente los id de las fincas
  if (rol === "ADMIN") {
    try {
      find_company = await Company.findOne({ nameCompany });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error de conexión bbdd:Company",
      });
    }

    if (!find_company) {
      // let farms_id = [];
      // for (element in farms) {
      //   try {
      //     info_farm = await Farm.findOne({ nameFarm: farms[element] });
      //   } catch (error) {
      //     return res.status(500).json({
      //       message: "Error de conexión bbdd:Farm",
      //     });
      //   }
      //   if (info_farm) {
      //     farms_id.push(info_farm._id);
      //   }
      // } //end for

      // new_company = { nameCompany, farms: farms_id };
      new_company = { nameCompany, farms};
      try {
        let doc = await Company.create(new_company);
        return res.json({
          success: true,
          message: "Nueva empresa creada correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error del servidor bbdd:Company",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "La empresa ya existe",
      });
    }
  } else {
    return res.json({
      success: false,
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
    functions.newseason(name, new_season, res);
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
    // let { nameFarm, area, cultivo, nom_season, nom_company } = req.body;
    let { nameFarm, area, cultivo, season, company } = req.body;
    // let season_id, info_season;
    // let company_id, info_company;
    // console.log(req.body)
    try {
      find_farm = await Farm.findOne({ nameFarm });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error de conexión",
      });
    }

    if (!find_farm) {
      // try {
      //   info_season = await Season.findOne({ name: nom_season });
      //   info_company = await Company.findOne({ nameCompany: nom_company });
      // } catch (error) {
      //   return res.status(500).json({
      //     message: "Error de conexión",
      //   });
      // }

      // if (info_season) {
      //   season_id = info_season._id;
      // }

      // if (info_company) {
      //   company_id = info_company._id;
      // }

      new_farm = {
        nameFarm,
        area,
        cultivo,
        season,
        company,
      };

      try {
        doc = await Farm.create(new_farm);
        console.log(company)
        for (element in company){
          console.log("element", element)
          console.log("company[element]", company[element])
          console.log("doc._id",doc._id)
          let mira = await Company.findByIdAndUpdate(company[element], {$push:{farms:doc._id}}, { new: true })
          console.log(mira)
        }
        
        return res.json({
          success: true,
          message: "Nueva finca creada correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error del servidor",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "La finca ya existe",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Error de rol",
    });
  }
});

//Ruta para crear maquinaria
router.post("/newmachinery", async (req, res) => {
  
  let rol = req.body.info.rol;
  
  if (rol === "ADMIN") {
    let find_machinery, doc;
    let { nameMachinery, nREF, datePurchase, pricePurchase, priceH } = req.body;
    
    try {
      find_machinery = await Machine.findOne({ nameMachinery});
      
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    if (!find_machinery) {
      
      let new_machinery = {
        nameMachinery,
        nREF,
        datePurchase,
        pricePurchase,
        priceH,
      };

      try {
        
        await Machine.create(new_machinery);
        return res.json({
          success: true,
          message: "Nueva maquinaria creada correctamente",
        });
      } catch (error) {
        return res.json({
          success: false,
          message: "Error al crear. Intentelo de nuevo",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "La maquinaria ya existe",
      });
    }
  } else {
    return res.json({
      success: false,
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
        success: false,
        message: "Error de conexión bbdd:tank",
      });
    }
    if (!find_tank) {
      let new_tank = { nameTank, capacity, currentLitres };
      try {
        doc = await Tank.create(new_tank);
        return res.json({
          success: true,
          message: "Nuevo depósito creado correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error del servidor bbdd:tank",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "El depósito ya existe",
      });
    }
  } else {
    return res.json({
      success: false,
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
    } catch (error) {
      return res.status(500).json({
        message: "Error del servidor bbdd:Task",
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
          message: "Error del servidor bbdd:Task",
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

//ruta nuevo producto
router.post("/newproduct", async (req, res) => {
  let rol = req.body.info.rol;
  if (rol === "ADMIN") {
    let find_product;
    let { nameProduct, nREF, pricePurchase } = req.body;
    try {
      find_product = await Product.findOne({ nameProduct: nameProduct });
    } catch (error) {
      return res.status(500).json({
        message: "Error del servidor bbdd:product",
      });
    }
    if (!find_product) {
      try {
        let doc;
        doc = await Product.create({ nameProduct, nREF, pricePurchase });
        return res.json({
          message: "Nuevo producto creado correctamente",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error del servidor bbdd:product",
        });
      }
    } else {
      return res.json({
        message: "el producto ya existe",
      });
    }
  } else {
    return res.json({
      message: "Error de rol",
    });
  }
});

//Rutas para administrar BBDD -->
//Ver elementos:
////Usuarios
router.get("/viewusers", async (req, res) => {
  let rol = req.body.info.rol;
  let info_users;
  if (rol === "ADMIN") {
    try {
      info_users = await User.find(
        { deleted: false },
        { password: 0, deleted: 0, works: 0 }
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión bbdd:User",
      });
    }
    res.json({
      infoUser: info_users,
      message: "info de usuarios",
    });
  } else {
    res.json({
      infoUser: null,
      message: "Error de rol",
    });
  }
});

////Empresas
router.get("/viewcompanies", async (req, res) => {
  let rol = req.body.info.rol;
  let info_;

  if (rol === "ADMIN") {
    try {
      info_ = await Company.find({ delete: false }, { works: 0, deleted: 0 })
      .populate("farms","nameFarm");
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    //let info_ = await functions.view_x(info_companies, Company, res); 

    return res.json({
      info: info_,
      message: "info de empresas",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

////Fincas
router.get("/viewfarms", async (req, res) => {
  let rol = req.body.info.rol;
  let info_;
  if (rol === "ADMIN") {
    try {
      info_ = await Farm.find({ delete: false }, { works: 0, deleted: 0 })
      .populate("season","name")
      .populate("company","nameCompany");
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    //let info_ = await functions.view_x(info_farms, Farm, res);

    res.json({
      info: info_,
      message: "info de fincas",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

////Maquinaria
router.get("/viewmachines", async (req, res) => {
  let rol = req.body.info.rol;
  let info_;
  if (rol === "ADMIN") {
    //let info_ = await functions.view_x(info_machines, Machine, res);
    try {
      info_ = await Machine.find({ delete: false }, { works: 0, deleted: 0 });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_,
      message: "info de maquinas",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

////Campaña
router.get("/viewseason", async (req, res) => {
  let rol = req.body.info.rol;
  let info_;
  if (rol === "ADMIN") {
    //let info_ = await functions.view_x(info_seasons, Season, res);
    try {
      info_ = await Season.find({ delete: false }, { works: 0, deleted: 0 });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_,
      message: "info de maquinas",
    });
    res.json({
      info: info_,
      message: "info de campañas",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

////Depositos
router.get("/viewtanks", async (req, res) => {
  let rol = req.body.info.rol;
  let info_tanks;
  if (rol === "ADMIN") {
    //let info_ = await functions.view_x(info_tanks, Tank, res);
    try {
      info_ = await Tank.find({ delete: false }, { works: 0, deleted: 0 });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_,
      message: "info de depositos",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

////Tareas
router.get("/viewtasks", async (req, res) => {
  let rol = req.body.info.rol;
  let info_tasks;
  if (rol === "ADMIN") {
    //let info_ = await functions.view_x(info_tasks, Task, res);
    try {
      info_ = await Task.find({ delete: false }, { works: 0, deleted: 0 });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_,
      message: "info de tareas",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

////pRODUCTOS
router.get("/viewproducts", async (req, res) => {
  let rol = req.body.info.rol;
  let info_;
  if (rol === "ADMIN") {
    //let info_ = await functions.view_x(info_products, Product, res);
    try {
      info_ = await Product.find({ delete: false }, { works: 0, deleted: 0 });
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_,
      message: "info de productos",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

////Ver elemento:
//Ver usuario:
router.get("/viewOneuser/:idUser", async (req, res) => {
  let rol = req.body.info.rol;
  let info_user;
  let id_user = req.params.idUser;
  if (rol === "ADMIN") {
    try {
      info_user = await User.findOne(
        { _id: id_user },
        { password: 0, works: 0, deleted: 0 } //
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      infoUser: info_user,
      message: "info de usuario",
    });
  } else {
    res.json({
      infoUser: null,
      message: "Error de rol",
    });
  }
});

//Ver empresa:
router.get("/viewOnecompany/:idCompany", async (req, res) => {
  let rol = req.body.info.rol;
  let info_company;
  let id_company = req.params.idCompany;
  if (rol === "ADMIN") {
    try {
      info_company = await Company.findOne(
        { _id: id_company },
        { works: 0, deleted: 0 }
      ).populate("farms", "nameFarm");
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_company,
      message: "info empresa",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

//Ver finca:
router.get("/viewOnefarm/:idFarm", async (req, res) => {
  let rol = req.body.info.rol;
  let info_farm;
  let id_farm = req.params.idFarm;
  if (rol === "ADMIN") {
    try {
      info_farm = await Farm.findOne({ _id: id_farm }, { works: 0, deleted: 0 })
        .populate("season", "name")
        .populate("company", "nameCompany");
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_farm,
      message: "info finca",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

//Ver maquinaria:
router.get("/viewOnemachine/:idmachine", async (req, res) => {
  let rol = req.body.info.rol;
  let info_machine;
  let id_machine = req.params.idmachine;
  if (rol === "ADMIN") {
    try {
      info_machine = await Machine.findOne(
        { _id: id_machine },
        { works: 0, deleted: 0 }
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_machine,
      message: "info maquina",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

//Ver campaña:
router.get("/viewOneseason/:idseason", async (req, res) => {
  let rol = req.body.info.rol;
  let info_season;
  let id_season = req.params.idseason;
  if (rol === "ADMIN") {
    try {
      info_season = await Season.findOne(
        { _id: id_season },
        { works: 0, deleted: 0 }
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_season,
      message: "info campaña",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

//Ver deposito:
router.get("/viewOnetank/:idtank", async (req, res) => {
  let rol = req.body.info.rol;
  let info_tank;
  let id_tank = req.params.idtank;
  if (rol === "ADMIN") {
    try {
      info_tank = await Tank.findOne(
        { _id: id_tank },
        { works: 0, deleted: 0 }
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_tank,
      message: "info deposito",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

//Ver tarea:
router.get("/viewOnetask/:idtask", async (req, res) => {
  let rol = req.body.info.rol;
  let info_task;
  let id_task = req.params.idtask;
  if (rol === "ADMIN") {
    try {
      info_task = await Task.findOne(
        { _id: id_task },
        { works: 0, deleted: 0 }
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_task,
      message: "info deposito",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

//Ver producto
router.get("/viewOneproduct/:idproduct", async (req, res) => {
  let rol = req.body.info.rol;
  let info_product;
  let id_product = req.params.idproduct;
  if (rol === "ADMIN") {
    try {
      info_product = await Product.findOne(
        { _id: id_product },
        { works: 0, deleted: 0 }
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error de conexión",
      });
    }
    res.json({
      info: info_product,
      message: "info producto",
    });
  } else {
    res.json({
      info: null,
      message: "Error de rol",
    });
  }
});

/////Modificar elemento
////UP Empresa
router.put("/upcompany/:idcompany", async (req, res) => {
  let id_company = req.params.idcompany;
  let { UPnameCompany, UPfarms } = req.body;

  if (UPfarms) {
    let id_farms = [];
    for (element in UPfarms) {
      id_farm = await Farm.findOne({ nameFarm: UPfarms[element] });
      id_farms.push(id_farm._id);
    }
    UPfarms = id_farms;
  }
  let doc = await Company.findByIdAndUpdate(
    id_company,
    { nameCompany: UPnameCompany, farms: UPfarms },
    { new: true }
  );

  res.json({
    message: "Empresa modificada",
    up_info: doc,
  });
});

////UP finca
router.put("/upfarm/:idfarm", async (req, res) => {
  let id_farm = req.params.idfarm;
  let { UPnameFarm, UParea, UPcultivo, UPseason, UPcompany } = req.body;

  if (UPseason) {
    UPseason = await Season.findOne({ name: UPseason });
  }

  if (UPcompany) {
    let id_companies = [];
    for (element in UPcompany) {
      id_company = await Company.findOne({ nameCompany: UPcompany[element] });
      id_companies.push(id_company._id);
    }
    UPcompany = id_companies;
  }

  let doc = await Farm.findByIdAndUpdate(
    id_farm,
    {
      nameFarm: UPnameFarm,
      area: UParea,
      cultivo: UPcultivo,
      season: UPseason,
      company: UPcompany,
    },
    { new: true }
  );
  res.json({
    message: "Finca modificada",
    up_info: doc,
  });
});

//UP maquinaria
router.put("/upmachine/:idmachine", async (req, res) => {
  let id_machine = req.params.idmachine;
  let { UPnameMachinery, UPnREF, UPdatePurchase, UPpricePurchase, UPpriceH } =
    req.body;
  let doc = await Machine.findByIdAndUpdate(
    id_machine,
    {
      nameMachinery: UPnameMachinery,
      nREF: UPnREF,
      datePurchase: UPdatePurchase,
      pricePurchase: UPpricePurchase,
      priceH: UPpriceH,
    },
    { new: true }
  );
  res.json({
    message: "Maquinaria modificada",
    up_info: doc,
  });
});

//up season
router.put("/upseason/:idseason", async (req, res) => {
  let id_season = req.params.idseason;
  let { UPname, UPdateINI, UPdateEND } = req.body;
  let doc = await Season.findByIdAndUpdate(
    id_season,
    {
      name: UPname,
      dateINI: UPdateINI,
      dateEND: UPdateEND,
    },
    { new: true }
  );
  res.json({
    message: "Campaña modificada",
    up_info: doc,
  });
});

//up deposito
router.put("/uptank/:idtank", async (req, res) => {
  let id_tank = req.params.idtank;
  let { UPnameTank, UPcapacity, UPcurrentLitres } = req.body;
  let doc = await Tank.findByIdAndUpdate(
    id_tank,
    {
      nameTank: UPnameTank,
      capacity: UPcapacity,
      currentLitres: UPcurrentLitres,
    },
    { new: true }
  );
  res.json({
    message: "Depósito modificado",
    up_info: doc,
  });
});

//up tareas
router.put("/uptask/:idtask", async (req, res) => {
  let id_task = req.params.idtask;
  let { UPnametask, UPcategory } = req.body;
  let doc = await Task.findByIdAndUpdate(
    id_task,
    {
      nametask: UPnametask,
      category: UPcategory,
    },
    { new: true }
  );
  res.json({
    message: "Tarea modificada",
    up_info: doc,
  });
});

//up producto
router.put("/upproduct/:idproduct", async (req, res) => {
  let id_product = req.params.idproduct;
  let { UPnameProduct, UPnREF, UPpricePurchase } = req.body;
  let doc = await Product.findByIdAndUpdate(
    id_product,
    {
      nameProduct: UPnameProduct,
      nREF: UPnREF,
      pricePurchase: UPpricePurchase,
    },
    { new: true }
  );
  res.json({
    message: "Produto modificado",
    up_info: doc,
  });
});

//Ruta BUSCAR TRABAJO POR
router.post("/searchfor", async (req, res) => {
  let { type_search, nom } = req.body;

  //let info;
  switch (type_search) {
    case "trabajador":
      info_user = await User.findOne({ nameUser: nom });
      id_user = info_user._id;

      try {
        info_ = await Work.find({ worker: id_user })
          .populate("worker", "nUser")
          .populate("company", "nameCompany")
          .populate("farm", "nameFarm")
          .populate("task", "nameTask")
          .populate("machinery", "nameMachinery")
          .populate("tank", "nameTank");
      } catch (error) {
        return res.status(500).json({
          message: "Error de conexión",
        });
      }

      if (info_.length != 0) {
        res.json({
          info: info_,
          message: "info de trabajos por usuario",
        });
      } else {
        res.json({
          info: null,
          message: "No hay coincidencias",
        });
      }

      break;

    case "empresa":
      info_company = await Company.findOne({ nameCompany: nom });
      let id_company = info_company._id;
      try {
        info_ = await Work.find({ company: id_company })
          .populate("worker", "nUser")
          .populate("company", "nameCompany")
          .populate("farm", "nameFarm")
          .populate("task", "nameTask")
          .populate("machinery", "nameMachinery")
          .populate("tank", "nameTank");
      } catch (error) {
        return res.status(500).json({
          message: "Error de conexión",
        });
      }

      if (info_.length != 0) {
        res.json({
          info: info_,
          message: "info de trabajos por empresa",
        });
      } else {
        res.json({
          info: null,
          message: "No hay coincidencias",
        });
      }
      break;

    case "finca":
      info_user = await Farm.findOne({ nameFarm: nom });
      let id_farm = info_user._id;

      try {
        info_ = await Work.find({ farm: id_farm })
          .populate("worker", "nUser")
          .populate("company", "nameCompany")
          .populate("farm", "nameFarm")
          .populate("task", "nameTask")
          .populate("machinery", "nameMachinery")
          .populate("tank", "nameTank");
      } catch (error) {
        return res.status(500).json({
          message: "Error de conexión",
        });
      }
      if (info_.length != 0) {
        res.json({
          info: info_,
          message: "info de trabajos por finca",
        });
      } else {
        res.json({
          info: null,
          message: "No hay coincidencias",
        });
      }
      break;

    case "maquinaria":
      info_user = await Machine.findOne({ nameMachinery: nom });
      let id_machine = info_user._id;

      try {
        info_ = await Work.find({ machinery: id_machine })
          .populate("worker", "nUser")
          .populate("company", "nameCompany")
          .populate("farm", "nameFarm")
          .populate("task", "nameTask")
          .populate("machinery", "nameMachinery")
          .populate("tank", "nameTank");
      } catch (error) {
        return res.status(500).json({
          message: "Error de conexión",
        });
      }
      if (info_.length != 0) {
        res.json({
          info: info_,
          message: "info de trabajos por maquinaria",
        });
      } else {
        res.json({
          info: null,
          message: "No hay coincidencias",
        });
      }

    case "deposito":
      info_info = await Tank.findOne({ nameTank: nom });
      let id_tank = info_info._id;

      try {
        info_ = await Work.find({ tank: id_tank })
          .populate("worker", "nUser")
          .populate("company", "nameCompany")
          .populate("farm", "nameFarm")
          .populate("task", "nameTask")
          .populate("machinery", "nameMachinery")
          .populate("tank", "nameTank");
      } catch (error) {
        return res.status(500).json({
          message: "Error de conexión",
        });
      }
      if (info_.length != 0) {
        res.json({
          info: info_,
          message: "info de trabajos por deposito",
        });
      } else {
        res.json({
          info: null,
          message: "No hay coincidencias",
        });
      }
      break;

    case "tarea":
      info_info = await Task.findOne({ nameTask: nom });
      let id_Task = info_info._id;

      try {
        info_ = await Work.find({ task: id_Task })
          .populate("worker", "nUser")
          .populate("company", "nameCompany")
          .populate("farm", "nameFarm")
          .populate("task", "nameTask")
          .populate("machinery", "nameMachinery")
          .populate("tank", "nameTank");
      } catch (error) {
        return res.status(500).json({
          message: "Error de conexión",
        });
      }
      if (info_.length != 0) {
        res.json({
          info: info_,
          message: "info de trabajos por tarea",
        });
      } else {
        res.json({
          info: null,
          message: "No hay coincidencias",
        });
      }
      break;

    case "producto":
      //info_info = await Product.findOne({ nameTask: nom });
      //info_ = await Work.getReadFilterKeys("name_pr")

      // try {
      //   info_ = await Work.find({ task: id_Task })
      //   .populate("worker", "nUser")
      //   .populate("company", "nameCompany")
      //   .populate("farm", "nameFarm")
      //   .populate("task", "nameTask")
      //   .populate("machinery", "nameMachinery")
      //   .populate("tank", "nameTank");
      // } catch (error) {
      //   return res.status(500).json({
      //     message: "Error de conexión",
      //   });
      // }
      // if (info_.length != 0) {
      res.json({
        info: info_,
        message: "info de trabajos por producto",
      });
      // } else {
      //   res.json({
      //     info: null,
      //     message: "No hay coincidencias",
      //   });
      // }
      break;
  }
});

//ruta mostrar 1trabajo desde buscar por

router.get("/getOnework/:idWork", async (req, res) => {
  let rol = req.body.info.rol;
  let id_work = req.params.idWork;

  if (rol === "ADMIN") {
    try {
      info_oneWork = await Work.findOne({ _id: id_work })
        .populate("worker", "nUser")
        .populate("company", "nameCompany")
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
      info_: info_oneWork,
      message: "info de trabajos",
    });
  } else {
    res.json({
      info_: null,
      message: "Error de rol",
    });
  }
});

//Borrado falso
//Borrar 1element0
//Empresa
router.put("/deletecompany/:idX", async (req, res) => {
  let rol = req.body.info.rol;
  let id_X = req.params.idX;
  if (rol === "ADMIN") {
    //estado deleted de empresa a true
    let info_x = await functions.deleteOneX(Company,id_X,res)
     // guardar array de fincas de la empresa borrada
    // id_x = info_x.farms
     //borrar la empresa del array de empresas en finca
    // for (element in id_x) {
    //         await Farm.findByIdAndUpdate(id_x[element], {
    //           $pull: { company: id_X },
    //         });
    //       }
    res.json({
      message: "Elemento eliminado",
    });
  } else {
    res.json({
      message: "Error de rol",
    });
  }
});

//Finca
router.put("/deletefarm/:idX", async (req, res) => {
  let rol = req.body.info.rol;
  let id_X = req.params.idX;
  if (rol === "ADMIN") {
    functions.deleteOneX(Farm, id_X, res);
    res.json({
      message: "Elemento eliminado",
    });
  } else {
    res.json({
      message: "Error de rol",
    });
  }
});

//Maquinaria
router.put("/deletemachine/:idX", async (req, res) => {
  let rol = req.body.info.rol;
  let id_X = req.params.idX;
  if (rol === "ADMIN") {
    functions.deleteOneX(Machine, id_X, res);
    res.json({
      message: "Elemento eliminado",
    });
  } else {
    res.json({
      message: "Error de rol",
    });
  }
});

//Campaña
router.put("/deleteseason/:idX", async (req, res) => {
  let rol = req.body.info.rol;
  let id_X = req.params.idX;
  if (rol === "ADMIN") {
    functions.deleteOneX(Season, id_X, res);
    res.json({
      message: "Elemento eliminado",
    });
  } else {
    res.json({
      message: "Error de rol",
    });
  }
});

//Deposito
router.put("/deletetank/:idX", async (req, res) => {
  let rol = req.body.info.rol;
  let id_X = req.params.idX;
  if (rol === "ADMIN") {
    functions.deleteOneX(Tank, id_X, res);
    res.json({
      message: "Elemento eliminado",
    });
  } else {
    res.json({
      message: "Error de rol",
    });
  }
});

//Tarea
router.put("/deletetask/:idX", async (req, res) => {
  let rol = req.body.info.rol;
  let id_X = req.params.idX;
  if (rol === "ADMIN") {
    functions.deleteOneX(Task, id_X, res);
    res.json({
      message: "Elemento eliminado",
    });
  } else {
    res.json({
      message: "Error de rol",
    });
  }
});

//Producto
router.put("/deleteproduct/:idX", async (req, res) => {
  let rol = req.body.info.rol;
  let id_X = req.params.idX;
  if (rol === "ADMIN") {
    functions.deleteOneX(Product, id_X, res);
    res.json({
      message: "Elemento eliminado",
    });
  } else {
    res.json({
      message: "Error de rol",
    });
  }
});

//Usuario
router.put("/deleteuser/:idX", async (req, res) => {
  let rol = req.body.info.rol;
  let id_X = req.params.idX;
  if (rol === "ADMIN") {
    functions.deleteOneX(User, id_X, res);
    res.json({
      success: true,
      message: "Elemento eliminado",
    });
  } else {
    res.json({
      success: false,
      message: "Error de rol",
    });
  }
});
//Borrado definitivo de trabajo
router.delete("/deletework/:idwork", async (req, res) => {
  let id_work = req.params.idwork;
  let rol = req.body.info.rol;
  if (rol === "ADMIN") {
    info_work = await Work.findByIdAndDelete(id_work);

    if (info_work) {
      let id_farm = info_work.farm;
      let id_worker = info_work.worker;
      let id_task = info_work.task;
      let id_machinery = info_work.machinery;
      let id_tank = info_work.tank;
      let id_products = info_work.products;

      if (id_farm) {
        for (element in id_farm) {
          let id = id_farm[element]._id;
          await Farm.findByIdAndUpdate(id, { $pull: { works: id_work } });
        }
      }
      if (id_task) {
        let id = id_task._id;
        await Task.findByIdAndUpdate(id, { $pull: { works: id_work } });
      }
      if (id_worker) {
        let id = id_worker._id;
        await User.findByIdAndUpdate(id, { $pull: { works: id_work } });
      }
      if (id_machinery) {
        for (element in id_machinery) {
          let id = id_machinery[element]._id;
          await Machine.findByIdAndUpdate(id, { $pull: { works: id_work } });
        }
      }
      if (id_tank) {
        let id = id_tank._id;
        await Tank.findByIdAndUpdate(id, { $pull: { works: id_work } });
      }
      if (id_products) {
        for (element in id_products) {
          let name = id_products[element].name_pr;
          
          let variable = await Product.findOneAndUpdate(
            { nameProduct: name },
            { $pull: { works: id_work } },
            { new: true }
          );
          console.log(variable)
        }
      }
      res.json({
        message: "Trabajo eliminado",
      });
    } else {
      res.json({
        message: "No existe",
      });
    }
  } else {
    res.json({
      message: "Error de rol",
    });
  }
});

//Borrado definitivo
//Borrar empresa
// router.delete("/delcompany/:idcompany", async (req, res) => {
//   let id_company = req.params.idcompany;
//   let rol = req.body.info.rol;
//   if (rol === "ADMIN") {
//     info = await Company.findById(id_company);
//     id_farms = info.farms;

//     await Company.findByIdAndDelete(id_company);
//     for (element in id_farms) {
//       await Farm.findByIdAndUpdate(id_farms[element], {
//         $pull: { company: id_company },
//       });
//     }

//     res.json({
//       message: "Empresa eliminada",
//     });
//   }
// });

// //Borrar finca
// router.delete("/delfarm/:idfarm", async (req, res) => {
//   let id_farm = req.params.idfarm;
//   let rol = req.body.info.rol;
//   if (rol === "ADMIN") {
//     info = await Farm.findById(id_farm);
//     id_companies = info.company;
//     await Farm.findByIdAndDelete(id_farm);

//     for (element in id_companies) {
//       await Company.findByIdAndUpdate(id_companies[element], {
//         $pull: { farms: id_farm },
//       });
//     }

//     res.json({
//       message: "Finca eliminada",
//     });
//   }
// });

module.exports = router;
