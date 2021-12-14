import { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav32-basic";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function Signup() {
  const [validated, setValidated] = useState(false);
  let [info, setInfo] = useState({
    nUser: "",
    nameUser: "",
    surnameUser: "",
    pass: "",
    phone: "",
    roleUser: "",
  });
  let [message_info, setMessage] = useState({
    message_info: window.localStorage.message,
  });

  const handleSubmit = async (event) => {
    window.localStorage.message = "";
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setMessage({ message_info: "Introduce todos los campos" });
    } else {
      let token = localStorage.getItem("token");

      let response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        info,
        {
          headers: { token: token },
        }
      );

      setMessage({ message_info: response.data.message });
    }
    setValidated(true);
  };

  const handle_change = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Nav></Nav>

      <Row className="mb-5"></Row>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <p className="h1 text-center mb-1">Nuevo usuario</p>

        <Col>
          {/* <Row className="mb-4"> */}

          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nº de usuario</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="text"
                name="nUser"
                onChange={handle_change}
                placeholder="DNI"
              />

              <Form.Control.Feedback type="invalid">
                *Campo requerido
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* </Row> */}
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Nombre</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="text"
                placeholder="Nombre"
                name="nameUser"
                onChange={handle_change}
              />
              <Form.Control.Feedback type="invalid">
                *Campo requerido
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Apellido</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                aria-describedby="inputGroupPrepend"
                name="surnameUser"
                onChange={handle_change}
                required
              />
              <Form.Control.Feedback type="invalid">
                *Campo requerido
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="pass"
              onChange={handle_change}
              required
            />
            <Form.Control.Feedback type="invalid">
              *Campo requerido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              onChange={handle_change}
              placeholder="Teléfono"
            />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Rol usuario</Form.Label>
            <Form.Control
              type="text"
              name="roleUser"
              onChange={handle_change}
              placeholder="Rol"
              required
            />
            <Form.Control.Feedback type="invalid">
              *Campo requerido
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <div className="d-flex justify-content-center">
          <Button variant="outline-warning" type="submit">
            Crear usuario
          </Button>
        </div>
        <div>
          <p className="error" id="message_info">
            {message_info.message_info}
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Signup;
