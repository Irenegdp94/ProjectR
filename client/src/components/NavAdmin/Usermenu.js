import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
export default function AccountMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="../user.png" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* menu desplegable user */}

        <MenuItem onClick={handleCloseNavMenu}>
          <Button style={{ color: "#2E3B55" }} size="small" href="/homeAdmin">
            <Typography>
              {<img align="center" src="../home.png" height="15" />} Home
            </Typography>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <Button style={{ color: "#2E3B55" }} href="/">
            {<img src="../logout.png" height="15" />} Log Out
          </Button>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseNavMenu}>
            <Button
                style={{ color: "#2E3B55" }} 
                size="small"
                href="javascript: history.go(-1)"
              >
               <ArrowBackIcon />Back
              </Button>
              
        </MenuItem>
      </Menu>
    </Box>
  );
}
