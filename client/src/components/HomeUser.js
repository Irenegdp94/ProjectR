//import "../styles/Homeuser.css";

import { useState, useEffect } from "react";
import axios from "axios";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Navbar";

const Homeuser = () => {
  let token = localStorage.getItem("token");
  let [nom, setNom] = useState({ nom: "" });
  const response = async () => {
    let response = await axios.get("http://localhost:5000/api/user/homeUser", {
      headers: { token: token },
    });

    setNom({ nom: response.data.infoUser.nameUser });
  };
  useEffect(() => {
    response();
  }, []);

  return (
    
      <div>
        <Nav />

      </div>
   
  );
};

export default Homeuser;
