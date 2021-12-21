import * as React from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import Nav from "../Nav32-basic";
import Loading from "../Loading"

// import Moreproducts from "./Moreproducts";
import {
  addDays,
  getDate,
  getDay,
  getMinutes,
  getMonth,
  getYear,
} from "date-fns";
import { getHours } from "date-fns/esm";

export default function Modifywork() {
  let history = useHistory();
  let id_farms = [];
  let id_company = [];
  let id_machines = [];
  let token = localStorage.getItem("token");
  let id_work = useParams().id;

  window.localStorage.message = "";

  const [message_info, setMessage] = React.useState({ message_info: "" });
  const [add, setAdd] = React.useState({ add_child: [] });

  //Fecha y hora
  const [valueINI, setValueINI] = React.useState(new Date());
  const [valueFIN, setValueFIN] = React.useState(new Date());

  //Desplegable finca
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputValue, setInputValue] = React.useState({}); //para capturar valor

  //desplegable trabajador
  const [open2, setOpen2] = React.useState(false);
  const [options2, setOptions2] = React.useState([]);
  const loading2 = open2 && options2.length === 0;
  const [inputValue2, setInputValue2] = React.useState({}); //para capturar valor

  //desplegable tarea
  const [open3, setOpen3] = React.useState(false);
  const [options3, setOptions3] = React.useState([]);
  const loading3 = open3 && options3.length === 0;
  const [inputValue3, setInputValue3] = React.useState({}); //para capturar valor

  //desplegable maquinas
  const [open4, setOpen4] = React.useState(false);
  const [options4, setOptions4] = React.useState([]);
  const loading4 = open4 && options4.length === 0;
  const [inputValue4, setInputValue4] = React.useState({}); //para capturar valor

  //desplegable deposito
  const [open5, setOpen5] = React.useState(false);
  const [options5, setOptions5] = React.useState([]);
  const loading5 = open5 && options5.length === 0;
  const [inputValue5, setInputValue5] = React.useState({}); //para capturar valor

  const [info, setInfo] = React.useState({
    dateINI: "",
    dateFIN: "",
    company: id_company,
    farm: id_farms,
    worker: "",
    task: "",
    machinery: id_machines,
    tank: "",
    litres_tank: "",
    products: [],
    description: "",
  });

 
//valores previos

const fresponse = async () => {
  
  let response = await axios.get(
    `http://localhost:5000/api/user/userwork/${id_work}`,
    {
      headers: { token: token },
    }
  );

  let datas = response.data.infoWorkUser;
  

  datas.farm.forEach((item)=>{
    id_farms.push(item.nameFarm)

  })
  console.log(id_farms)
  setInfo({
    dateINI: datas.dateINI,
    dateFIN: datas.dateFIN,
    company: id_company,
    farm: id_farms,
    worker: "",
    task: "",
    machinery: id_machines,
    tank: "",
    litres_tank: "",
    products: [],
    description: "",
    
    loading: false });

    console.log(info);
};
useEffect(() => {
  fresponse();
}, []);





















  //desplegable fincas
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return;
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
      // console.log(response.data.info);
      let array_farms = response.data.info;
      ///////////////

      if (active) {
        setOptions([...array_farms]); //el nombre de la lista
      }
    })();
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  //desplegable trabajador
  React.useEffect(() => {
    let active = true;

    if (!loading2) {
      return;
    }

    (async () => {
      ////////////// aqui va la consulata a la bbdd (la lista desplegable)
      let token = localStorage.getItem("token");
      let response2 = await axios.get(
        "http://localhost:5000/api/search/sworker",
        {
          headers: { token: token },
        }
      );

      let array_worker = response2.data.info;

      ///////////////

      if (active) {
        setOptions2([...array_worker]); //el nombre de la lista
      }
    })();
  }, [loading2]);

  React.useEffect(() => {
    if (!open2) {
      setOptions2([]);
    }
  }, [open2]);

  //desplegable tarea
  React.useEffect(() => {
    let active = true;

    if (!loading3) {
      return;
    }

    (async () => {
      ////////////// aqui va la consulata a la bbdd (la lista desplegable)
      let token = localStorage.getItem("token");
      let response3 = await axios.get(
        "http://localhost:5000/api/search/stasks",
        {
          headers: { token: token },
        }
      );

      let array_tasks = response3.data.info;

      ///////////////

      if (active) {
        setOptions3([...array_tasks]); //el nombre de la lista
      }
    })();
  }, [loading3]);

  React.useEffect(() => {
    if (!open3) {
      setOptions3([]);
    }
  }, [open3]);

  //desplegable maquinas
  React.useEffect(() => {
    let active = true;

    if (!loading4) {
      return;
    }

    (async () => {
      ////////////// aqui va la consulata a la bbdd (la lista desplegable)
      let token = localStorage.getItem("token");
      let response4 = await axios.get(
        "http://localhost:5000/api/search/smachines",
        {
          headers: { token: token },
        }
      );

      let array_machines = response4.data.info;
      // console.log(array_machines);
      ///////////////

      if (active) {
        setOptions4([...array_machines]); //el nombre de la lista
      }
    })();
  }, [loading4]);

  React.useEffect(() => {
    if (!open4) {
      setOptions4([]);
    }
  }, [open4]);

  //desplegable deposito
  React.useEffect(() => {
    let active = true;

    if (!loading5) {
      return;
    }

    (async () => {
      ////////////// aqui va la consulata a la bbdd (la lista desplegable)
      let token = localStorage.getItem("token");
      let response5 = await axios.get(
        "http://localhost:5000/api/search/stank",
        {
          headers: { token: token },
        }
      );

      let array_tank = response5.data.info;

      ///////////////

      if (active) {
        setOptions5([...array_tank]); //el nombre de la lista
      }
    })();
  }, [loading5]);

  React.useEffect(() => {
    if (!open5) {
      setOptions5([]);
    }
  }, [open5]);

  const totimestamp = (strDate) => {
    let month = getMonth(strDate) + 1;
    let day = getDate(strDate);
    let hour = getHours(strDate)
    let min = getMinutes(strDate)

    if (month < 10){month = `0${month}`}
    if (day < 10){day = `0${day}`}
    if (hour < 10){hour = `0${hour}`}
    if (min < 10){min = `0${min}`}

    return `${getYear(strDate)}-${month}-${day}T${hour}:${min}:00.000+00:00`;
  };

  const handle_change = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handle_add = (event) => {
    // let array = add.add_child
    // event.preventDefault();
    // array.push("child")
    // setAdd({...add, add_child: array})
    // console.log(add)
    // contador.n += 1
    let array = info.products;
    let esto = { name_pr: "", litres: "", id: array.length + 1 };
    array.push(esto);
    setInfo({ ...info, products: array });
  };

  const updateValue = (name, value, id) => {
    // console.log("name",name)
    // console.log("value",value)
    // console.log("id",id)
    let array = info.products;
    array.forEach((element) => {
      if (element.id === id) {
        if (name === "name_pr") {
          element.name_pr = value;
        }
        if (name === "litres") {
          element.litres = value;
        }
      }
    });

    setInfo({ ...info, products: array });
  };

  //boton submit
  const valNumRegex = /^\d*\.?\d*$/;
  const handle_submit = async (event) => {
    event.preventDefault();

    
    // } else {
    //   if (!valNumRegex.test(info.litres_tank)) {
    //     setMessage({
    //       message_info: "Litros: Sustituye la coma por un punto",
    //     });
     
      // console.log("boton enviar");
      info.dateINI = totimestamp(valueINI);
      info.dateFIN = totimestamp(valueFIN);

      for (let i in inputValue) {
        
        id_farms.push(inputValue[i]._id);
        for (let j in inputValue[i].company){
          let newVal = inputValue[i].company[j]._id
          if (!id_company.includes(newVal)){
            id_company.push(newVal)
          }
        }
        
      }
      info.farm = id_farms;
      info.company = id_company;
      info.worker = inputValue2._id;//cambiar
      info.task = inputValue3._id;

      for (let i in inputValue4) {
        id_machines.push(inputValue[i]._id);
      }
      info.machinery = id_machines;
      info.tank = inputValue5._id;

      if (!info.dateINI || !info.worker || !info.task) {
        // console.log("no sigue",info)
        event.stopPropagation();
        setMessage({ message_info: "Introduce todos los datos" });
      
      } 
      else {
      
      try {
        let token = localStorage.getItem("token");

        let responseF = await axios.post(
          "http://localhost:5000/api/both/newwork",
          info,
          {
            headers: { token: token },
          }
        );

        setMessage({ message_info: responseF.data.message });
        if (responseF.data.success === true) {
          window.localStorage.message = responseF.data.message;
          history.push("/homeAdmin");
        }
        console.log(responseF)
      } catch (error) {
        window.localStorage.message = "Error del servidor";
      }
      // console.log(responseF);
      }
     
  }
 

  // console.log("valueINI", valueINI, "valueFIN", valueFIN);

  return (
    <div>
      
      <Nav />
      <h1>Modificar trabajo</h1>
      {info.loading === true ? (
        <Loading/> ) : (
          <FormControl>
          <Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: 300, maxWidth: "85%" },
              }}
              noValidate
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  inputFormat="dd/MM/yyyy  HH:mm"
                  label="Fecha / hora inicio"
                  ampm={false}
                  value={info.dateINI}
                  onChange={(newValue) => {
                    setValueINI(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
  
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: 300, maxWidth: "85%" },
              }}
              noValidate
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  inputFormat="dd/MM/yyyy  HH:mm"
                  label="Fecha / hora fin"
                  ampm={false}
                  value={info.dateFIN}
                  onChange={(newValue) => {
                    setValueFIN(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
  
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, maxWidth: "85%" },
              }}
              noValidate
              autoComplete="off"
            >
              <Autocomplete
                multiple
                id="asynchronous-demo"
                sx={{ width: 300 }}
                limitTags={2}
                defaultValue={id_farms[0]}
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
                    // color="secondary"
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
  {/* {poner condicional para el rol: si user no poner worker} */}
              <Autocomplete
                id="asynchronous-workers"
                sx={{ width: 300 }}
                open={open2}
                onOpen={() => {
                  setOpen2(true);
                }}
                onClose={() => {
                  setOpen2(false);
                }}
                onChange={(event, newInputValue) => {
                  setInputValue2({ ...newInputValue });
  
                  //inputValue es el valor del input final
                }}
                isOptionEqualToValue={(option2, value) =>
                  option2.nameUser === value.nameUser
                }
                getOptionLabel={(option2) => option2.nameUser}
                options={options2}
                loading={loading2}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Trabajador"
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
  
              <Autocomplete
                id="asynchronous-workers"
                sx={{ width: 300 }}
                open={open3}
                onOpen={() => {
                  setOpen3(true);
                }}
                onClose={() => {
                  setOpen3(false);
                }}
                onChange={(event, newInputValue) => {
                  setInputValue3({ ...newInputValue });
  
                  //inputValue es el valor del input final
                }}
                isOptionEqualToValue={(option3, value) =>
                  option3.nameTask === value.nameTask
                }
                getOptionLabel={(option3) => option3.nameTask}
                options={options3}
                loading={loading3}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tarea"
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
             
  
              <Autocomplete
                multiple
                id="asynchronous-machines"
                sx={{ width: 300 }}
                open={open4}
                onOpen={() => {
                  setOpen4(true);
                }}
                onClose={() => {
                  setOpen4(false);
                }}
                //Para capturar valor:
                onChange={(event, newInputValue) => {
                  setInputValue4(newInputValue);
                  //inputValue es el valor del input final
                }}
                //////////hay que cambiar option.blabla
                isOptionEqualToValue={(option4, value) =>
                  option4.nameMachinery === value.nameMachinery
                }
                getOptionLabel={(option) => option.nameMachinery}
                options={options4}
                loading={loading4}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Maquinaria"
                    // color="secondary"
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
  
              <Autocomplete
                id="asynchronous-tank"
                sx={{ width: 300 }}
                open={open5}
                onOpen={() => {
                  setOpen5(true);
                }}
                onClose={() => {
                  setOpen5(false);
                }}
                onChange={(event, newInputValue) => {
                  setInputValue5({ ...newInputValue });
  
                  //inputValue es el valor del input final
                }}
                isOptionEqualToValue={(option5, value) =>
                  option5.nameTank === value.nameTank
                }
                getOptionLabel={(option5) => option5.nameTank}
                options={options5}
                loading={loading5}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Depósito"
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
  
              <Box sx={{ maxWidth: "85%" }}>
                <TextField
                  id="litres_tank"
                  name="litres_tank"
                  type="number"
                  label="Litros"
                  variant="outlined"
                  onChange={handle_change}
                />
              </Box>
  
              {/* <Box sx={{ p: 2, border: "1px dashed grey" }}>
                {info.products.map((child) => {
                  return (
                    <Moreproducts
                      passingFunction={updateValue}
                      passingChild={child.id}
                    />
                  );
                })}
  
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Button onClick={handle_add}>
                    <AddCircleOutlineRoundedIcon /> añadir producto
                  </Button>
                </Stack>
              </Box> */}
            </Box>
  
            <Box sx={{ height: 20 }} />
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handle_submit}
              >
                Modificar
              </Button>
            </Stack>
            <div>
              <p className="error" id="message_info">
                {message_info.message_info}
                
              </p>
            </div>
          </Box>
        </FormControl>
        )
      }
     
    </div>
  );
}
