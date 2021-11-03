// Server backEnd
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./API/authRoutes");
const app = express();

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

app.use(express.json()); 

//Routes
app.use("/", authRoutes); //login route


// montar servidor -->
app.listen(5000, () => {
    console.log("server listening on port 5000");
  });
  