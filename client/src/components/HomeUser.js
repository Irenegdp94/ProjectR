//HOME USUARIO
//import "../styles/Homeuser.css";

import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Nav from "./NavUser/Nav32User";
import Loading from "./Loading"

const Homeuser = () => {
  let token = localStorage.getItem("token");
  let [info_state, setInfo] = useState({ nom: "", rol: "", loading: true });
  const [open, setOpen] = useState(true);
  const response = async () => {
    let response = await axios.get("http://localhost:5000/api/user/homeUser", {
      headers: { token: token },
    });

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
    
    <div className="main-container flex-center title-container">
      {info_state.loading === true ? (
        <Loading/>
      ) : (
        <Nav roluser={info_state.rol}></Nav>
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

export default Homeuser;
