// Server backEnd
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("./MIDDLEWARE/verifyToken");
const verifyInputs = require("./MIDDLEWARE/verifyInputs");
const authRoutes = require("./API/authRoutes");
const userRoutes = require("./API/privateRoutesUser");
const adminRoutes = require("./API/privateRoutesADMIN");
const bothRoutes = require("./API/privateROUTES");
const app = express();
const cors = require("cors")

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

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes

app.use("/api/auth", verifyInputs, authRoutes); //login route localhost:5000/api/auth/
app.use("/api/user", verifyToken, userRoutes); //user routers localhost:5000/api/user/
app.use("/api/admin", verifyToken, adminRoutes); //admin routers localhost:5000/api/admin/
app.use("/api/both", verifyToken, bothRoutes); // localhost:5000/api/both/
// montar servidor -->
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
