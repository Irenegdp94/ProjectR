import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function NestedList() {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton component="a" href="/vieworks">
        <ListItemIcon>
          <VisibilityOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Ver trabajos" />
      </ListItemButton>

      <ListItemButton component="a" href="/">
        <ListItemIcon>
          <AddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Nuevo trabajo" />
      </ListItemButton>
    </List>
  );
}
