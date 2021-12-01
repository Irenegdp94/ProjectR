//BARRA DE NAVEGACION USUARIO
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useState } from "react";

const NavBarbasic = (props) => {
  return (
    <Navbar className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Navbar.Brand>
          <img src="/Logotipo.png" width="80" height="80" />
        </Navbar.Brand>
      </div>
      <div>
        <Navbar.Collapse>
          <NavDropdown
            title={
              <img
                src="../user.png"
                className="rounded-circle"
                height="40"
                alt="avatar"
                loading="lazy"
              />
            }
          >
            <NavDropdown.Item href="/homeAdmin">
              {<img src="../home.png" height="15" />} Home
            </NavDropdown.Item>
            <NavDropdown.Item href="/">
              {<img src="../logout.png" height="15" />} Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBarbasic;
