//CREAR NUEVA EMPRESA
import * as React from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Nav from "../components/Nav32-basic";
import axios from "axios";

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

export default function Asynchronous() {
  window.localStorage.message = "";
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputValue, setInputValue] = React.useState(""); //para capturar valor
  const [message_info, setMessage] = React.useState({
    message_info: ""
  });
  let array_id_farms = [];
  const [info, setInfo] = React.useState({
    nameCompany: "",
    farms: array_id_farms,
  });
  let history = useHistory();
  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      ////////////// aqui va la consulata a la bbdd (la lista desplegable)
      let token = localStorage.getItem("token");
      let response = await axios.get(
        "http://localhost:5000/api/search/sfarms",
        {
          headers: { token: token },
        }
      );
      let array_farms = response.data.info;
      ///////////////

      if (active) {
        setOptions([...array_farms]); //el nombre de la lista
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const handle_change = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  const handle_submit = async (event) => {
    event.preventDefault();
    if (!info.nameCompany) {
      event.stopPropagation();
      setMessage({ message_info: "Introduce el nombre de la empresa" });
    } else {
      try {
        let token = localStorage.getItem("token");
        for (let i in inputValue) {
          array_id_farms.push(inputValue[i]._id);
        }
        info.farms = array_id_farms;
        let response = await axios.post(
          "http://localhost:5000/api/admin/newcompany",
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
        window.localStorage.message = error;
      }
    }
  };

  return (
    <div>
      <Nav></Nav>
      <h1>Crear empresa</h1>
      <Box component="form" Validate autoComplete="off">
        <FormControl>
          <TextField
            color="secondary"
            id="outlined-basic"
            name="nameCompany"
            label="Nombre empresa"
            variant="outlined"
            sx={{ width: 300 }}
            onChange={handle_change}
          />
          <Box sx={{ height: 20 }} />
          <Autocomplete
            multiple
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            //Para capturar valor:
            onChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              //inputValue es el valor del input final
            }}
            //////////hay que cambiar option.blabla
            isOptionEqualToValue={(option, value) =>
              option.nameFarm === value.nameFarm
            }
            getOptionLabel={(option) => option.nameFarm}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Fincas"
                color="secondary"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />

          <Box sx={{ height: 20 }} />

          <Stack spacing={2} direction="row">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handle_submit}
            >
              Crear
            </Button>
          </Stack>
        </FormControl>
      </Box>
      <div>
        <p className="error" id="message_info">
          {message_info.message_info}
        </p>
      </div>
    </div>
  );
}
