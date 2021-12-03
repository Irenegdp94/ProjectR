//HOME ADMINISTRADOR
import "../styles/Homeadmin.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import Nav from "./Navbar";
// import Nav from "../components/NavAdmin/Nav32"

// import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
const Homeadmin = () => {
  let token = localStorage.getItem("token");
  const [open, setOpen] = useState(true);
  let [info_state, setInfo] = useState({ nom: "", rol: "", loading: true });
  const response = async () => {
    let response = await axios.get(
      "http://localhost:5000/api/admin/homeAdmin",
      {
        headers: { token: token },
      }
    );
    setInfo({
      nom: response.data.infoUser.nameUser,
      rol: response.data.infoUser.roleUser,
      loading: false,
    });
  };
  useEffect(() => {
    response();
  }, []);

  return (
    <div>
      {info_state.loading === true ? (
        <Loading />
      ) : (
        <Nav roluser={info_state.rol} />
        
        
      )}

      <Box sx={{ width: "100%" }}>
        {window.localStorage.message != "" ? (
          
          <Collapse in={open}>
            
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    window.localStorage.message = "";
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {window.localStorage.message}
            </Alert>
          </Collapse>
        ) : (
          (window.localStorage.message = "")
        )}
      </Box>
    </div>
  );
};

export default Homeadmin;
