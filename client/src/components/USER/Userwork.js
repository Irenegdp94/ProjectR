import * as React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import BinIcon from "@mui/icons-material/DeleteOutlineRounded";
import { red } from "@mui/material/colors";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import ClockPicker from "@mui/lab/ClockPicker";

import Loading from "../Loading";
import Nav from "../Nav32-basic";

export default function Onework() {
  // console.log(props)
  //   let id_work = props.id;
  let id_work = useParams().id;
  console.log(id_work);
  //   let [info, setInfo] = useState({ data: [], loading: true });
  let [info, setInfo] = useState({ data: [], loading: true });
  const [valueINI, setValueINI] = React.useState(new Date());

  const [valueFIN, setValueFIN] = React.useState(new Date());
  //   const valNumRegex = /^\d*\.?\d*$/;
  console.log(info);
  let [message_info, setMessage] = useState({
    message_info: window.localStorage.message,
  });
  let token = localStorage.getItem("token");
  //   let [open, setOpen] = useState(true);

  const fresponse = async () => {
    let response = await axios.get(
      `localhost:5000/api/user/userwork/${id_work}`,
      {
        headers: { token: token },
      }
    );

    let datas = response.data.infoWorkUser;
    console.log(datas);
    setInfo({ data: datas, loading: false });
  };
  useEffect(() => {
    fresponse();
  }, []);

  const handleChange = (event) => {
    console.log("cambio");
    // setInfo({
    //   ...info,
    //   [event.target.name]: event.target.value,
    //   loading: false,
    // });
  };

  const handle_submit = async (event) => {
    event.preventDefault();
    console.log("submit");

    // try {
    //   let response_up = await axios.put(
    //     `http://localhost:5000/api/both/upuser/${id_user}`,
    //     values,
    //     {
    //       headers: { token: token },
    //     }
    //   );

    //   setMessage({ message_info: response_up.data.message });
    //   if (response_up.data.success === true) {
    //     window.localStorage.message = response_up.data.message;
    //     history.push("/viewusers");
    //   }
    // } catch (error) {
    //   setMessage({ message_info: "Error conexion bbdd" });
    // }
  };

  const handle_erasing = async () => {
    console.log("borrar");
    // try {
    //   let response_del = await axios.put(
    //     `http://localhost:5000/api/admin/deleteuser/${id_user}`,
    //     values,
    //     {
    //       headers: { token: token },
    //     }
    //   );

    //   setMessage({ message_info: response_del.data.message });
    //   console.log(message_info);
    //   console.log(response_del);
    //   if (response_del.data.success === true) {
    //     window.localStorage.message = response_del.data.message;
    //     history.push("/viewusers");
    //   }
    // } catch (error) {
    //   setMessage({ message_info: "Error conexion bbdd" });
    // }
  };

  return (
    <div>
      <Nav />

      {/* {info.loading === true ? (
        <Loading />
      ) : ( */}
      <form autoComplete="off">
        <Card>
          <CardHeader title="Trabajo" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Fecha / hora inicio"
                    ampm={false}
                    value={valueINI}
                    onChange={(newValue) => {
                      setValueINI(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Fecha / hora fin"
                    value={valueFIN}
                    ampm={false}
                    onChange={(newValue) => {
                      setValueFIN(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Empresa"
                  name="company"
                  onChange={handleChange}
                  // value={values.nUser}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Finca"
                  name="farm"
                  onChange={handleChange}
                  // value={values.nameUser}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Trabajador"
                  name="worker"
                  onChange={handleChange}
                  // value={values.surnameUser}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Tarea"
                  name="task"
                  onChange={handleChange}
                  type="number"
                  // value={values.phone}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Maquinaria"
                  name="machinery"
                  onChange={handleChange}
                  type="number"
                  // value={values.phone}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Button color="primary" variant="text" onClick={handle_erasing}>
              <BinIcon sx={{ fontSize: 30, color: red[700] }} />
            </Button>

            <Button color="primary" variant="contained" onClick={handle_submit}>
              Guardar cambios
            </Button>
          </Box>
        </Card>
        <Box sx={{ height: 20 }} />
        <p className="error">{message_info.message_info}</p>
      </form>
      {/* )} */}
    </div>
  );
}
