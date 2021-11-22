//import "../styles/Homeadmin.css";
import { useState, useEffect } from "react";

// import { useHistory } from "react-router-dom";
import axios from "axios";
const Homeadmin = () => {
  let token = localStorage.getItem("token");
  let [nom, setNom] = useState({nom: "" });
  const response = async () => {
    let response = await axios.get(
      "http://localhost:5000/api/admin/homeAdmin",
      {
        headers: { token: token },
      }
    );

    setNom({nom:response.data.infoUser.nameUser})
  };
  useEffect(() => {response()},[])
 
  return <h1>hola {nom.nom}</h1>;
};

export default Homeadmin;
