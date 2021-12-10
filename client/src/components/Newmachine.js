import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Nav from "../components/Nav32-basic";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl, { useFormControl } from "@mui/material/FormControl";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function BasicTextFields() {
  window.localStorage.message = "";
  let history = useHistory();
  const [message_info, setMessage] = React.useState({
    message_info: "",
  });
  const [info, setInfo] = React.useState({
    nameMachinery: "",
    nREF: "",
    datePurchase: React.useState(new Date()),
    pricePurchase: "",
    priceH: "",
  });
  const [value, setValue] = React.useState(null);
  const valNumRegex = /^\d*\.?\d*$/;
  const handle_change = (event) => {
    setInfo({ ...info, [event.target.id]: event.target.value });
  };

  const handle_submit = async (event) => {
    event.preventDefault();
    info.datePurchase = value;
    if (
      !info.nameMachinery ||
      !info.nREF ||
      !info.datePurchase ||
      !info.pricePurchase ||
      !info.priceH
    ) {
      event.stopPropagation();
      setMessage({ message_info: "Introduce todos los datos" });
    } else {
      if (!valNumRegex.test(info.pricePurchase)) {
        setMessage({
          message_info: "Precio de compra: Sustituye la coma por un punto",
        });
      } else {
        if (!valNumRegex.test(info.priceH)) {
          setMessage({
            message_info: "Precio hora: Sustituye la coma por un punto",
          });
        } else {
          try {
            let token = localStorage.getItem("token");

            let response = await axios.post(
              "http://localhost:5000/api/admin/newmachinery",
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
      }
    }
  };

  return (
    <Box>
      <Nav />
      <h1>Nueva máquina</h1>
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
            id="nameMachinery"
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
            id="nREF"
            label="Número de referencia"
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="datePurchase"
              inputFormat="dd/MM/yyyy"
              // views={['day', 'month', 'year']}
              label="Fecha de compra"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
            id="pricePurchase"
            label="Precio de compra"
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
            id="priceH"
            label="Precio hora"
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
