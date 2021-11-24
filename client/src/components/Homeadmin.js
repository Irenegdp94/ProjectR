//import "../styles/Homeadmin.css";
import { useState, useEffect } from "react";
import Nav from "./Navbar";
// import { useHistory } from "react-router-dom";
import axios from "axios";
const Homeadmin = () => {
  let token = localStorage.getItem("token");
  
  let [info_state, setInfo] = useState({ nom: "", rol: "" ,loading: true});
  const response = async () => {
    let response = await axios.get(
      "http://localhost:5000/api/admin/homeAdmin",
      {
        headers: { token: token },
      }
    );
    console.log(response.data)
    setInfo({ nom: response.data.infoUser.nameUser, rol:response.data.infoUser.roleUser, loading:false });
    
  };
  useEffect(() => {
    response();
  }, []);
  

  return (
    <div>
      
      {info_state.loading === true ?
         (<h1>Loading</h1>)
         :
         (<Nav roluser={info_state.rol}/>)
      }
      
      
    </div>
  );
};

export default Homeadmin;
