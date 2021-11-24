//import "../styles/Homeuser.css";

import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
// import { Route } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import Nav from "./Navbar";

const Homeuser = () => {
  let token = localStorage.getItem("token");
  let [info_state, setInfo] = useState({ nom: "", rol: "" ,loading: true});
  const response = async () => {
    let response = await axios.get("http://localhost:5000/api/user/homeUser", {
      headers: { token: token },
    });

    setInfo({ nom: response.data.infoUser.nameUser, rol:response.data.infoUser.roleUser, loading:false });
  };
  useEffect(() => {
    response();
  }, []);
console.log(info_state)
  return (
    
      <div className="main-container flex-center title-container">
        {info_state.loading === true ?
         (<h1>Loading</h1>)
         :
         (<Nav roluser={info_state.rol}/>)
      }

      </div>
   
  );
};

export default Homeuser;
