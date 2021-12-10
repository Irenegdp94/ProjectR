import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function NestedList() {
  const [openView, setOpenView] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);

  const handleClickView = () => {
    setOpenView(!openView);
  };

  const handleClickCreate = () => {
    setOpenCreate(!openCreate);
  };

  const handleClickSearch = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClickView}>
        <ListItemText primary="Ver" />
        {openView ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openView} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component="a" href="/viewusers">
            <ListItemText sx={{ pl: 4 }}>Usuarios</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewcompanies">
            <ListItemText sx={{ pl: 4 }}>Empresas</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewfarms">
            <ListItemText sx={{ pl: 4 }}>Fincas</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewmachines">
            <ListItemText sx={{ pl: 4 }}>Maquinaria</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewtanks">
            <ListItemText sx={{ pl: 4 }}>Dépositos</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewtask">
            <ListItemText sx={{ pl: 4 }}>Tareas</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewtanks">
            <ListItemText sx={{ pl: 4 }}>Productos</ListItemText>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickCreate}>
        <ListItemText primary="Crear" />
        {openCreate ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCreate} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component="a" href="/signup">
            <ListItemText sx={{ pl: 4 }}>Usuario</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/newcompany">
            <ListItemText sx={{ pl: 4 }}>Empresa</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/newfarm">
            <ListItemText sx={{ pl: 4 }}>Finca</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/newmachine">
            <ListItemText sx={{ pl: 4 }}>Maquinaria</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/newtank">
            <ListItemText sx={{ pl: 4 }}>Déposito</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/">
            <ListItemText sx={{ pl: 4 }}>Tarea</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/">
            <ListItemText sx={{ pl: 4 }}>Producto</ListItemText>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickSearch}>
        <ListItemText primary="Buscar trabajo por" />
        {openSearch ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSearch} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component="a" href="/viewusers">
            <ListItemText sx={{ pl: 4 }}>Usuarios</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewcompanies">
            <ListItemText sx={{ pl: 4 }}>Empresas</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewfarms">
            <ListItemText sx={{ pl: 4 }}>Fincas</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewmachines">
            <ListItemText sx={{ pl: 4 }}>Maquinaria</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewtanks">
            <ListItemText sx={{ pl: 4 }}>Dépositos</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewtask">
            <ListItemText sx={{ pl: 4 }}>Tareas</ListItemText>
          </ListItemButton>

          <ListItemButton component="a" href="/viewtanks">
            <ListItemText sx={{ pl: 4 }}>Productos</ListItemText>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton component="a" href="/">
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Nuevo trabajo" />
      </ListItemButton>
    </List>
  );
}
