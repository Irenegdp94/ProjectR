require("dotenv").config();


let verifyInputs = async (req, res, next) => {
    let {nUser, pass} = req.body;
  // console.log(req.body)
    if (!nUser || !pass) {
      res.json({
        auth: false,
        message: "Introduce el nº de usuario y contraseña",
      });
      return;
    }else{
        next();
    }
  
}
  module.exports = verifyInputs;