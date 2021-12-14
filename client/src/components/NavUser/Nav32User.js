import * as React from "react";
import "../../styles/Nav32.css";
import AppBar from "@mui/material/AppBar";
import AccountMenu from "./UsermenuUser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Menu from "@mui/material/Menu";
import NestedList from "./LateralUser";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";

const ResponsiveAppBar = () => {
  const theme = useTheme();

  // menu lateral
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const drawerWidth = 240;
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  //
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // menu pc
  ///////ver:
  const [anchorElView, setAnchorElView] = React.useState(null);
  const openView = Boolean(anchorElView);
  const handleOpenView = (event) => {
    setAnchorElView(event.currentTarget);
  };
  const handleCloseView = () => {
    setAnchorElView(null);
  };

 ///////crear:
  const [anchorElNew, setAnchorElNew] = React.useState(null);
  const openNew = Boolean(anchorElNew);
  const handleOpenNew = (event) => {
    setAnchorElNew(event.currentTarget);
  };
  const handleCloseNew = () => {
    setAnchorElNew(null);
  };


   ///////buscar por:
   const [anchorElSearch, setAnchorElSearch] = React.useState(null);
   const openSearch = Boolean(anchorElSearch);
   const handleOpenSearch = (event) => {
     setAnchorElSearch(event.currentTarget);
   };
   const handleCloseSearch = () => {
     setAnchorElSearch(null);
   };

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
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerOpen}
                // color='primary'
              >
                <img src="/Logotipo.png" width="40" height="40" />
                {/* <MenuIcon /> */}
              </IconButton>


            </Box>

            <Box
              sx={{
                pl: 4,
                flexGrow: 1,
                display: { xs: "none", md: "flex", pl: "4" },
              }}
            >
              {/* menu pc */}
              

            
              <Button
                className="boton-verde"
                // sx={{ ml: "60%" }}
                component="a"
                href="/homeUser"
              >
                Ver trabajos
              </Button>
              <Box sx={{width:20}}/>
              <Button
                className="boton-verde"
                // sx={{ ml: "60%" }}
                component="a"
                href="/"
              >
                Nuevo trabajo
              </Button>
            </Box>

            {/* icono usuario: */}
            <AccountMenu />
          </Toolbar>
        </Container>
      </AppBar>

      {/* barra lateral */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <ListSubheader component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
        <Divider />
        <NestedList />
      </Drawer>
    </Box>
  );
};
export default ResponsiveAppBar;
