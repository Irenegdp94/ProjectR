//Lista desplegable para elegir un elemento con await
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputValue, setInputValue] = React.useState(""); //para capturar valor

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

  return (
    <div>
      <h1>Crear empresa</h1>
      
      <TextField
        color="secondary"
        id="outlined-basic"
        label="Nombre empresa"
        variant="outlined"
      />
      <Box sx={{height: 20}}/> 
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
          //newInputValue es el valor del input final
          console.log(newInputValue);
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
    </div>
  );
}
