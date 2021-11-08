// Server backEnd
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("./MIDDLEWARE/verifyToken");
const verifyInputs = require("./MIDDLEWARE/verifyInputs");
const authRoutes = require("./API/authRoutes");
const userRoutes = require("./API/privateRoutesUser");
const adminRoutes = require("./API/privateRoutesADMIN");
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
app.use("/api/auth",verifyInputs, authRoutes); //login route localhost:5000/api/auth/login
app.use("/api/user", verifyToken, userRoutes), //user routers localhost:5000/api/user/
app.use("/api/admin", verifyToken, adminRoutes), //admin routers localhost:5000/api/admin/

// montar servidor -->
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  });
  

  