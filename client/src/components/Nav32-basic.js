import * as React from "react";
import "../styles/Nav32.css";
import AppBar from "@mui/material/AppBar";
import AccountMenu from "./NavAdmin/Usermenu";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";


const ResponsiveAppBar2 = () => {
  return (
    <Box>
      <AppBar position="static" style={{ background: "#2E3B55" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <img src="/Logotipo.png" width="50" height="50" />
            </IconButton>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <img src="/Logotipo.png" width="40" height="40" />
            </Box>

            <Box
              sx={{
                pl: "80%",
                flexGrow: 1,
                display: { xs: "none", md: "flex", pl: "80%" },
              }}
            >
              {/* <Button
                className="boton-verde"
                component="a"
                href="javascript: history.go(-1)"
              >
                <ArrowBackIcon />
                Back
              </Button> */}

            </Box>

            <AccountMenu />

            {/* icono usuario: */}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar2;
