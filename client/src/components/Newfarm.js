import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Nav from "./Navbar-basic";
import Box from "@mui/material/Box";
import FormControl, { useFormControl } from "@mui/material/FormControl";
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

  //para empresa
  // const [open2, setOpen2] = React.useState(false);
  // const [options2, setOptions2] = React.useState([]);
  // const loading2 = open2 && options2.length === 0;

  //para season
  React.useEffect(() => {
    console.log("option", options);
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let token = localStorage.getItem("token");

      let response = await axios.get(
        "http://localhost:5000/api/search/sseassons",
        {
          headers: { token: token },
        }
      );
      let array_seasons = response.data.info;
      // console.log("array_seasons", array_seasons);
      // let response2 = await axios.get(
      //   "http://localhost:5000/api/search/scompany",
      //   {
      //     headers: { token: token },
      //   }
      // );
      // let array_company = response2.data.info;
      // console.log("array_company", array_company);
      if (active) {
        setOptions([...array_seasons]);
        // setOptions2([...array_company]);
        // console.log("option", options);
        
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
      <Nav></Nav>
      <h1>Crear finca</h1>
      <Box component="form" Validate autoComplete="off">
        <FormControl>
          <TextField
            color="secondary"
            id="outlined-basic"
            name="nameFarm"
            label="Nombre finca"
            variant="outlined"
            sx={{ width: 300 }}
            // onChange={handle_change}
          />
          <Box sx={{ height: 20 }} />

          <TextField
            color="secondary"
            id="outlined-basic"
            name="area"
            label="Área"
            variant="outlined"
            sx={{ width: 300 }}
            // onChange={handle_change}
          />
          <Box sx={{ height: 20 }} />

          <TextField
            color="secondary"
            id="outlined-basic"
            name="cultivo"
            label="Cultivo"
            variant="outlined"
            sx={{ width: 300 }}
            // onChange={handle_change}
          />
          <Box sx={{ height: 20 }} />

          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
              console.log("onclose")
            }}
            // onChange={() => {console.log("hola")}}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Campaña"
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
          
        </FormControl>
      </Box>
    </div>
  );
}
