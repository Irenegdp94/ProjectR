 //Desplegable finca
 import * as React from "react";
 import axios from "axios";
 
 import { useHistory } from "react-router-dom";
 import TextField from "@mui/material/TextField";
 import Autocomplete from "@mui/material/Autocomplete";
 import CircularProgress from "@mui/material/CircularProgress";
 import Box from "@mui/material/Box";



export default function Moreproducts (props){
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [inputValue, setInputValue] = React.useState(); //para capturar valor
// console.log(props)
    const handle_change = (event) => {
      // setInputValue({ ...inputValue, litres: event.target.value });
      // console.log(event.target.name)
      props.passingFunction(event.target.name,event.target.value,props.passingChild)
    };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return;
    }

    (async () => {
      ////////////// aqui va la consulata a la bbdd (la lista desplegable)
      let token = localStorage.getItem("token");
      let response = await axios.get(
        "http://localhost:5000/api/search/sproduct",
        {
          headers: { token: token },
        }
      );
      // console.log(response.data.info);
      let array_products = response.data.info;
      ///////////////

      if (active) {
        setOptions([...array_products]); //el nombre de la lista
      }
    })();
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);


    return(
        <Box sx={{ display: "flex", height:"20" }}>
            <Autocomplete
            id="asynchronous-product"
            name="name_pr"
            sx={{ width: 300, maxWidth: "85%"}}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(event, newInputValue) => {
              // setInputValue({ ...inputValue, nom:newInputValue.nameProduct });
              console.log(newInputValue)
              // console.log(event)
              if (newInputValue){
                props.passingFunction("name_pr",newInputValue.nameProduct,props.passingChild)
              }
              
              //inputValue es el valor del input final
            }}
            isOptionEqualToValue={(option, value) =>
              option.nameProduct === value.nameProduct
            }
            getOptionLabel={(option) => option.nameProduct}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
               
                label="Producto"
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
          {/* {console.log(inputValue)} */}
          
<Box>
          <TextField
            id="litres_product"
            name="litres"
            label="Litros"
            variant="outlined"
            onChange={handle_change}
          />
        </Box>
{/* {console.log(inputValue)} */}

        </Box>
    )
}