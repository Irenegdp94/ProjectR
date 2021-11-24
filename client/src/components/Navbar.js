import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


import { useState } from "react";

const NavBar = (props) => {
  console.log(props.roluser);

  if (props.roluser === "ADMIN") {
    return (
		<Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
        <Container>
          <Navbar.Brand>
            <img src="/Logotipo.png" width="80" height="80" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">

          <NavDropdown title="Ver" className="super-colors">
            <NavDropdown.Item key="1" href="/viewusers">Trabajadores</NavDropdown.Item>
            <NavDropdown.Item key="2"href="/viewcompanies">Empresas</NavDropdown.Item>
            <NavDropdown.Item key="3"href="/viewfarms">Fincas</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item key="4"href="/viewmachines">Maquinaria</NavDropdown.Item>
            <NavDropdown.Item key="5"href="/viewseason">Campañas</NavDropdown.Item>
            <NavDropdown.Item key="6"href="/viewtanks">Depositos</NavDropdown.Item>
            <NavDropdown.Item key="7"href="/viewtanks">Tareas</NavDropdown.Item>
			<NavDropdown.Item key="23"href="/viewtanks">Productos</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Crear" className="btn-group">
            <NavDropdown.Item key="8"href="/signup">Trabajador</NavDropdown.Item>
            <NavDropdown.Item key="9"href="/newcompany">Empresa</NavDropdown.Item>
            <NavDropdown.Item key="10"href="/newfarm">Finca</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item key="11"href="/newmachinery">Maquinaria</NavDropdown.Item>
            <NavDropdown.Item key="12"href="/newseason">Campaña</NavDropdown.Item>
            <NavDropdown.Item key="13"href="/newtank">Deposito</NavDropdown.Item>
            <NavDropdown.Item key="14"href="/newtask">Tarea</NavDropdown.Item>
			<NavDropdown.Item key="15"href="/newproduct">Producto</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Buscar por" className="btn-group">
            <NavDropdown.Item key="15"href="/searchforuser">Trabajador</NavDropdown.Item>
            <NavDropdown.Item key="16"href="/searchforcompany">Empresa</NavDropdown.Item>
            <NavDropdown.Item key="17"href="/searchforfarm">Finca</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item key="18"href="/searchformachine">Maquinaria</NavDropdown.Item>
            <NavDropdown.Item key="19"href="/searchforseason">Campaña</NavDropdown.Item>
            <NavDropdown.Item key="20"href="/searchfortank">Deposito</NavDropdown.Item>
            <NavDropdown.Item key="21"href="/searchfortask">Tarea</NavDropdown.Item>
			<NavDropdown.Item key="24"href="/searchforproduct">Producto</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="/" key="22">Nuevo trabajo</Nav.Link>
		  </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
	  return(
<Navbar collapseOnSelect className="navbar navbar-light bg-light">
      <Container>
        <Navbar.Brand>
          <img src="/Logotipo.png" width="80" height="80" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Nav.Link href="/newwork" key="1">Nuevo trabajo</Nav.Link>
		<Nav.Link href="/userworks" key="2">Ver trabajos</Nav.Link>

      </Container>
    </Navbar>
	  )
    
  }
};

export default NavBar;
