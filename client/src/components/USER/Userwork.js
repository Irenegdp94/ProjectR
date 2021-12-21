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

import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";
import BinIcon from "@mui/icons-material/DeleteOutlineRounded";
import { red } from "@mui/material/colors";

import CalendarIcon from "@mui/icons-material/Event";
import ClockIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/TimerOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import RIcon from "@mui/icons-material/CropOutlined";
import TractorIcon from "@mui/icons-material/AgricultureOutlined";
import PetrolIcon from "@mui/icons-material/LocalGasStation";
import SanitizerIcon from "@mui/icons-material/Sanitizer";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import ClockPicker from "@mui/lab/ClockPicker";

import Loading from "../Loading";
import Nav from "../Nav32-basic";
import getDate from "date-fns/getDate";
import { getDay, getHours, getMinutes, getMonth, getYear } from "date-fns";

const typ = (
  <Typography variant="body2">
    hola <br />
  </Typography>
);

export default function Onework() {
  let history = useHistory();
  // console.log(props)
  //   let id_work = props.id;
  let id_work = useParams().id;
  console.log(id_work);

  let [info, setInfo] = useState({ data: [], loading: true });
  const [valueINI, setValueINI] = React.useState(
    new Date("2021-12-14T13:24:00.000Z")
  );
  // let dI = String(info.data.dateINI)
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
      `http://localhost:5000/api/user/userwork/${id_work}`,
      {
        headers: { token: token },
      }
    );

    let datas = response.data.infoWorkUser;
    console.log(info.data);
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

  // const handle_submit = async (event) => {
   
  //   event.preventDefault();
  //   console.log("modificar");
  //   history.push("/modifywork");

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
  // };

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

      {info.loading === true ? (
        <Loading />
      ) : (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 16 }} variant="body1" gutterBottom>
                  {`Trabajo: ${info.data.description}`}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <CalendarIcon />
                  {`${getDate(new Date(info.data.dateINI))}/${
                    getMonth(new Date(info.data.dateINI)) + 1
                  }/${getYear(new Date(info.data.dateINI))}`}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <ClockIcon />
                  {`${getHours(new Date(info.data.dateINI))}:${getMinutes(
                    new Date(info.data.dateINI)
                  )} a ${getHours(new Date(info.data.dateFIN))}:${getMinutes(
                    new Date(info.data.dateFIN)
                  )}`}
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <TimerIcon />
                  {`${(
                    Math.abs(
                      new Date(info.data.dateFIN) - new Date(info.data.dateINI)
                    ) / 3600000
                  ).toFixed(2)} h`}
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {`${info.data.worker.nameUser}`}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secundary"
                  gutterBottom
                >
                  <BusinessIcon />
                  Empresa
                </Typography>
              </Grid>

              <Grid item xs={6}>
                {info.data.company.map((company) => {
                  return (
                    <Typography variant="body2">
                      {`-${company.nameCompany}`}
                    </Typography>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secundary"
                  gutterBottom
                >
                  <RIcon />
                  Finca
                </Typography>
              </Grid>

              <Grid item xs={6}>
                {info.data.farm.map((farm) => {
                  return (
                    <Typography variant="body2">
                      {`-${farm.nameFarm}`}
                    </Typography>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secundary"
                  gutterBottom
                >
                  <TractorIcon /> Maquinaria
                </Typography>
              </Grid>

              <Grid item xs={6}>
                {info.data.machinery.map((machinery) => {
                  return (
                    <Typography variant="body2">
                      {`-${machinery.nameMachinery}`}
                    </Typography>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secundary"
                  gutterBottom
                >
                  <PetrolIcon />
                  {info.data.tank.nameTank}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                {`${info.data.litres_tank} litros`}
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secundary"
                  gutterBottom
                >
                  <SanitizerIcon /> Productos
                </Typography>
              </Grid>

              <Grid item xs={6}>
                {info.data.products.map((product) => {
                  return (
                    <Typography variant="body2">
                      {`-${product.name_pr}: ${product.litres} L`}
                    </Typography>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
          
            <Button size="small" href={`/upwork/${id_work}`}>Modificar</Button>
            {/* <Button size="small" onClick={handle_erasing}>Borrar</Button> */}
          </CardActions>
        </Card>
      )}
    </div>
  );
}
