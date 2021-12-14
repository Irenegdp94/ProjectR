import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl, { useFormControl } from "@mui/material/FormControl";

import Nav from "../Nav32-basic";

export default function Newtask() {
  window.localStorage.message = "";
  let history = useHistory();
  const [message_info, setMessage] = React.useState({
    message_info: "",
  });
  const [info, setInfo] = React.useState({
    nameTask: "",
    category: "",
  });

  const handle_change = (event) => {
    setInfo({ ...info, [event.target.id]: event.target.value });
  };

  const handle_submit = async (event) => {
    event.preventDefault();
    if (!info.nameTask || !info.category) {
      event.stopPropagation();
      setMessage({ message_info: "Introduce todos los datos" });
    } else {
      try {
        let token = localStorage.getItem("token");

        let response = await axios.post(
          "http://localhost:5000/api/admin/newtask",
          info,
          {
            headers: { token: token },
          }
        );

        setMessage({ message_info: response.data.message });
        if (response.data.success === true) {
          window.localStorage.message = response.data.message;
          history.push("/homeAdmin");
        }
      } catch (error) {
        window.localStorage.message = "Error del servidor";
      }
    }
  };

  return (
    <Box>
      <Nav />
      <h1>Nueva tarea</h1>
      <FormControl>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="nameTask"
            label="Nombre"
            variant="outlined"
            onChange={handle_change}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="category"
            label="Categoría"
            variant="outlined"
            onChange={handle_change}
          />
        </Box>

        <Box sx={{ height: 20 }} />
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handle_submit}
          >
            Crear
          </Button>
        </Stack>
        <div>
          <p className="error" id="message_info">
            {message_info.message_info}
          </p>
        </div>
      </FormControl>
    </Box>
  );
}
