require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./MODELS/User");
const Company = require("./MODELS/Company");
const Farm = require("./MODELS/Farm");
const Machinery = require("./MODELS/Machinery");
const Season = require("./MODELS/Season");
const Tank = require("./MODELS/Tank");
const Task = require("./MODELS/Task");
const Work = require("./MODELS/Work");


const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

mongoose
  .connect(
    `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.1oz61.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectado");
  })
  .catch((error) => {
    console.log(`Ha ocurrido el siguiente error: ${error}`);
  });

let passwords = ["hola", "adios", "gato", "cordoba"];
let hashes = passwords.map((password) => bcrypt.hashSync(password, salt));

let users = [
  {
    _id: "500261f9c934fb0418e42aa1",
    nUser: "EH9654964S",
    nameUser: "Luis",
    password: hashes[0], //hola
    phone: 924587454,
    roleUser: "USER",
    works: []
  },
  {
    _id: "500261f9c934fb0418e42aa2",
    nUser: "EH9654968S",
    nameUser: "Carmen",
    password: hashes[1], //adios
    phone: 924587458,
    roleUser: "USER",
    works: []
  },
  {
    _id: "500261f9c934fb0418e42aa3",
    nUser: "EH9654969S",
    nameUser: "Juan",
    password: hashes[2], //gato
    phone: 924587459,
    roleUser: "USER",
    works: ["100061f9c934fb0418e42e01"]
  },
  {
    _id: "500261f9c934fb0418e42aa4",
    nUser: "EH9654961S",
    nameUser: "Laura",
    password: hashes[3], //cordoba
    phone: 924587451,
    roleUser: "ADMIN",
    works: []
  },
];

let companies = [
  {
    _id: "799261f9c934fb0418e42ee1",
    nameCompany: "Bioseca",
    farms: ["799261f9c934fb0418e42ee4","799261f9c934fb0418e42ee5"],
  },

  {
    _id: "799261f9c934fb0418e42ee2",
    nameCompany: "Oleodeus",
    farms: ["799261f9c934fb0418e42ee3"],
  },
];

let farms = [
  {
    _id: "799261f9c934fb0418e42ee3",
    nameFarm: "Zamora",
    area: 28.47,
    cultivo: "Olivo",
    season: ["799261f9c934fb0418e42e11"],
    company: ["799261f9c934fb0418e42ee2"]
  },

  {
    _id: "799261f9c934fb0418e42ee4",
    nameFarm: "La Isla esparrago",
    area: 12.05,
    cultivo: "Esparrago",
    season: ["799261f9c934fb0418e42e11"],
    company: ["799261f9c934fb0418e42ee1"]
  },
  {
    _id: "799261f9c934fb0418e42ee5",
    nameFarm: "La Isla olivo",
    area: 12.12,
    cultivo: "Olivo",
    season: ["799261f9c934fb0418e42e12"],
    company: ["799261f9c934fb0418e42ee1"]
  }
];

let machineries = [
  {
    _id: "799261f9c934fb0418e42ee6",
    nameMachinery: "JD5100",
    nREF: "JD5100LR",
    datePurchase: 12-05-2012,
    priceH: 5.4
  },
  {
    _id: "799261f9c934fb0418e42ee7",
    nameMachinery: "Atomizador",
    nREF: "AT1100BI",
    datePurchase: 12-05-2012,
    priceH: 1.1
  },
  {
    _id: "799261f9c934fb0418e42ee8",
    nameMachinery: "Cadenas NH",
    nREF: "NH8800LR",
    datePurchase: 2012-05-12,
    priceH: 5.4
  }
];

let tanks = [
  {
    _id: "799261f9c934fb0418e42ee9",
    nameTank: "Bioseca tractores",
    capacity: 2000,
    litres: 2000
  },
  {
    _id: "799261f9c934fb0418e42e10",
    nameTank: "Grupo río La Vega",
    capacity: 1000,
    litres: 900
  }
];

let seasons = [
  {
    _id: "799261f9c934fb0418e42e11",
    dateINI: 01-05-1994,
    dateEND: 2012-05-12
  },
  {
    _id: "799261f9c934fb0418e42e12",
    dateINI: 2031-12-31,
    dateEND: 1999-11-12
  },

]

let tasks = [
  {
    _id: "799261f9c934fb0418e42e13",
    nameTask: "Herbicida",
    category: "Tratamiento fitosanitario"
  },
  {
    _id: "799261f9c934fb0418e42e14",
    nameTask: "Sulfato",
    category: "Tratamiento fitosanitario"
  },

  {
    _id: "799261f9c934fb0418e42e24",
    nameTask: "Mantenimiento vehículos",
    category: "Mantenimiento"
  }
];

let works = [
  {
    _id: "100061f9c934fb0418e42e01",
    date: "02/10/2021",
    INItime: new Date('2021-12-31T13:24:00Z'), 
    FINtime: new Date('1995-12-17T05:28:00Z'),
        
    farm: ["799261f9c934fb0418e42ee3"],
    worker: "500261f9c934fb0418e42aa3",
    machinery: ["799261f9c934fb0418e42ee6","799261f9c934fb0418e42ee7"],
    tank: "799261f9c934fb0418e42ee9",
    task: "799261f9c934fb0418e42e13"
  }
];


const createInfo = async () => {
  //usuarios
  let deletedUsers = await User.deleteMany();
  console.log(deletedUsers);
  let createdUsers = await User.create(users);
  console.log(createdUsers);

  //empresa
  let deletedCompanies = await Company.deleteMany();
  console.log(deletedCompanies);
  let createdCompanies = await Company.create(companies);
  console.log(createdCompanies);

  //fincas
  let deletedFarms = await Farm.deleteMany();
  console.log(deletedFarms);
  let createdFarms = await Farm.create(farms);
  console.log(createdFarms);

  //maquinaria
  let deletedMachineries = await Machinery.deleteMany();
  console.log(deletedMachineries);
  let createdMachineries = await Machinery.create(machineries);
  console.log(createdMachineries);

  //tanque
  let deletedTanks = await Tank.deleteMany();
  console.log(deletedTanks);
  let createdTanks = await Tank.create(tanks);
  console.log(createdTanks);

  //season
  let deletedSeasons = await Season.deleteMany();
  console.log(deletedSeasons);
  let createdSeasons = await Season.create(seasons);
  console.log(createdSeasons);

  //tarea
  let deletedTasks = await Task.deleteMany();
  console.log(deletedTasks);
  let createdTasks = await Task.create(tasks);
  console.log(createdTasks);

//trabajos

  let deletedWorks = await Work.deleteMany();
  console.log(deletedWorks);
  let createdWorks = await Work.create(works);
  console.log(createdWorks);



  mongoose.disconnect();
  console.log("disconnect");
};
createInfo();
