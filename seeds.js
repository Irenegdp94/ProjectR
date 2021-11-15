require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./MODELS/User");
const Company = require("./MODELS/Company");
const Farm = require("./MODELS/Farm");
const Machine = require("./MODELS/Machine");
const Season = require("./MODELS/Season");
const Tank = require("./MODELS/Tank");
const Task = require("./MODELS/Task");
const Product = require("./MODELS/Product");
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
    nameUser: "Luis", //.toUpperCase() en el value
    surnameUser: "Paniagua", //.toUpperCase()
    password: hashes[0], //hola
    phone: 924587454,
    roleUser: "USER",
    works: [],
  },
  {
    _id: "500261f9c934fb0418e42aa2",
    nUser: "EH9654968S",
    nameUser: "Carmen",
    surnameUser: "Paniagua",
    password: hashes[1], //adios
    phone: 924587458,
    roleUser: "USER",
    works: [],
  },
  {
    _id: "500261f9c934fb0418e42aa3",
    nUser: "EH9654969S",
    nameUser: "Juan",
    surnameUser: "Garcia",
    password: hashes[2], //gato
    phone: 924587459,
    roleUser: "USER",
    works: ["100061f9c934fb0418e42e01"],
  },
  {
    _id: "500261f9c934fb0418e42aa4",
    nUser: "EH9654961S",
    nameUser: "Laura",
    surnameUser: "Perez",
    password: hashes[3], //cordoba
    phone: 924587451,
    roleUser: "ADMIN",
    works: [],
  },
];

let companies = [
  {
    _id: "799261f9c934fb0418e42ee1",
    nameCompany: "Bioseca",
    farms: ["799261f9c934fb0418e42ee4", "799261f9c934fb0418e42ee5"],
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
    season: "799261f9c934fb0418e42e11",
    company: ["799261f9c934fb0418e42ee2"],
    works: ["100061f9c934fb0418e42e01"],
  },

  {
    _id: "799261f9c934fb0418e42ee4",
    nameFarm: "La Isla esparrago",
    area: 12.05,
    cultivo: "Esparrago",
    season: "799261f9c934fb0418e42e11",
    company: ["799261f9c934fb0418e42ee1"],
    works: [],
  },
  {
    _id: "799261f9c934fb0418e42ee5",
    nameFarm: "La Isla olivo",
    area: 12.12,
    cultivo: "Olivo",
    season: "799261f9c934fb0418e42e12",
    company: ["799261f9c934fb0418e42ee1"],
    works: [],
  },
];

let machineries = [
  {
    _id: "799261f9c934fb0418e42ee6",
    nameMachinery: "JD5100",
    nREF: "JD5100LR",
    datePurchase: new Date("2020-12-31T00:00:00Z"),
    pricePurchase: 5400,
    priceH: 5.4,
    works: ["100061f9c934fb0418e42e01"],
  },
  {
    _id: "799261f9c934fb0418e42ee7",
    nameMachinery: "Atomizador",
    nREF: "AT1100BI",
    datePurchase: new Date("2019-09-25T00:00:00Z"),
    pricePurchase: 2400,
    priceH: 1.1,
    works: ["100061f9c934fb0418e42e01"],
  },
  {
    _id: "799261f9c934fb0418e42ee8",
    nameMachinery: "Cadenas NH",
    nREF: "NH8800LR",
    datePurchase: new Date("2019-05-25T00:00:00Z"),
    pricePurchase: 2400,
    priceH: 5.4,
    works: [],
  },
];

let tanks = [
  {
    _id: "799261f9c934fb0418e42ee9",
    nameTank: "Bioseca tractores",
    capacity: 2000,
    currentLitres: 2000,
    works: ["100061f9c934fb0418e42e01"],
  },
  {
    _id: "799261f9c934fb0418e42e10",
    nameTank: "Grupo río La Vega",
    capacity: 1000,
    currentLitres: 900,
    works: [],
  },
];

let seasons = [
  {
    _id: "799261f9c934fb0418e42e11",
    name: "mayo-diciembre",
    dateINI: new Date("2019-05-25T00:00:00Z"),
    dateEND: new Date("2019-12-25T00:00:00Z"),
    works: [],
  },
  {
    _id: "799261f9c934fb0418e42e12",
    name: "nov-sep",
    dateINI: new Date("2020-11-01T00:00:00Z"),
    dateEND: new Date("2021-09-28T00:00:00Z"),
    works: ["100061f9c934fb0418e42e01"],
  },
];

let tasks = [
  {
    _id: "799261f9c934fb0418e42e13",
    nameTask: "Herbicida",
    category: "Tratamiento fitosanitario",
    works: ["100061f9c934fb0418e42e01"],
  },
  {
    _id: "799261f9c934fb0418e42e14",
    nameTask: "Sulfato",
    category: "Tratamiento fitosanitario",
    works: [],
  },

  {
    _id: "799261f9c934fb0418e42e24",
    nameTask: "Mantenimiento vehículos",
    category: "Mantenimiento",
    works: [],
  },
];

let products = [
  {
    _id: "799261f9c934fb0418e42e25",
    nameProduct: "BUFFER",
    nREF: "BU2547631",
    pricePurchase: 126.45,
    works: ["100061f9c934fb0418e42e01"],
  },
  {
    _id: "799261f9c934fb0418e42e26",
    nameProduct: "KASIO",
    nREF: "KA2547951",
    pricePurchase: 12.2,
    works: [],
  },
];

let works = [
  {
    _id: "100061f9c934fb0418e42e02",
    dateINI: new Date("2021-12-31T13:24:00Z"),
    dateFIN: new Date("1995-12-17T05:28:00Z"),
    farm: ["799261f9c934fb0418e42ee3"],
    worker: "500261f9c934fb0418e42aa1",
    task: "799261f9c934fb0418e42e13",
    machinery: ["799261f9c934fb0418e42ee6", "799261f9c934fb0418e42ee7"],
    tank: "799261f9c934fb0418e42ee9",
    litres_tank: 50,
    products: [
      {
        name_pr: "KASIO",
        litres: 25,
      },
      {
        name_pr: "BUFFER",
        litres: 295,
      }
    ],
    
    // litres_product: 26,
    description: "Echar Hebicida",
  },

  {
    _id: "100061f9c934fb0418e42e01",
    dateINI: new Date("2021-12-31T13:24:00Z"),
    dateFIN: new Date("1995-12-17T05:28:00Z"),
    farm: ["799261f9c934fb0418e42ee3"],
    worker: "500261f9c934fb0418e42aa3",
    task: "799261f9c934fb0418e42e13",
    machinery: ["799261f9c934fb0418e42ee6", "799261f9c934fb0418e42ee7"],
    tank: "799261f9c934fb0418e42ee9",
    litres_tank: 50,
    products: [
      {
        name_pr: "KASIO",
        litres: 25,
      },
      {
        name_pr: "BUFFER",
        litres: 295,
      }
    ],
    
    // litres_product: 26,
    description: "Echar Hebicida",
  },
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
  let deletedMachineries = await Machine.deleteMany();
  console.log(deletedMachineries);
  let createdMachineries = await Machine.create(machineries);
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

  //productos
  let deletedProducts = await Product.deleteMany();
  console.log(deletedProducts);
  let createdProducts = await Product.create(products);
  console.log(createdProducts);

  //trabajos

  let deletedWorks = await Work.deleteMany();
  console.log(deletedWorks);
  let createdWorks = await Work.create(works);
  console.log(createdWorks);

  mongoose.disconnect();
  console.log("disconnect");
};
createInfo();
