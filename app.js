// Server backEnd
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("./MIDDLEWARE/verifyToken");
const authRoutes = require("./API/authRoutes");
const userRoutes = require("./API/privateRoutesUser");
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
app.use("/api/auth", authRoutes); //login route
app.use("/api/works", verifyToken, userRoutes), //user routers

// montar servidor -->
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  });
  

  