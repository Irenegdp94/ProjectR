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
import { red } from '@mui/material/colors';
import Loading from "../Loading";

export const AccountProfileDetails = (props) => {
  let history = useHistory();
  let id_user = props.id;
  let [message_info, setMessage] = useState({
    message_info: window.localStorage.message,
  });
  let token = localStorage.getItem("token");
  let [values, setValues] = useState({
    nUser: "",
    nameUser: "",
    surnameUser: "",
    phone: "",
    roleUser: "",
    loading: true,
    states: [
      {
        value: "USER",
        label: "USER",
      },
      {
        value: "ADMIN",
        label: "ADMIN",
      },
    ],
  });

  const fresponse = async () => {
    let response = await axios.get(
      `http://localhost:5000/api/admin/viewOneuser/${id_user}`,
      {
        headers: { token: token },
      }
    );
    let user_data = response.data.infoUser;

    if (response.data.infoUser.roleUser === "ADMIN") {
      setValues({
        nUser: user_data.nUser,
        nameUser: user_data.nameUser,
        surnameUser: user_data.surnameUser,
        phone: user_data.phone,
        roleUser: user_data.roleUser,
        loading: false,
        states: [
          {
            value: "ADMIN",
            label: "ADMIN",
          },
          {
            value: "USER",
            label: "USER",
          },
        ],
      });
    } else {
      setValues({
        nUser: user_data.nUser,
        nameUser: user_data.nameUser,
        surnameUser: user_data.surnameUser,
        phone: user_data.phone,
        roleUser: user_data.roleUser,
        loading: false,
        states: [
          {
            value: "USER",
            label: "USER",
          },
          {
            value: "ADMIN",
            label: "ADMIN",
          },
        ],
      });
    }
  };
  useEffect(() => {
    fresponse();
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      loading: false,
    });
  };

  const handle_submit = async (event) => {
    event.preventDefault();

    try {
      let response_up = await axios.put(
        `http://localhost:5000/api/both/upuser/${id_user}`,
        values,
        {
          headers: { token: token },
        }
      );

      setMessage({ message_info: response_up.data.message });
      if (response_up.data.success === true) {
        window.localStorage.message = response_up.data.message;
        history.push("/viewusers");
      }
    } catch (error) {
      setMessage({ message_info: "Error conexion bbdd" });
    }
  };

  const handle_erasing = async () => {
    try {
      let response_del = await axios.put(
        `http://localhost:5000/api/admin/deleteuser/${id_user}`,
        values,
        {
          headers: { token: token },
        }
      );

      setMessage({ message_info: response_del.data.message });
      console.log(message_info)
      console.log(response_del)
      if (response_del.data.success === true) {
        window.localStorage.message = response_del.data.message;
        history.push("/viewusers");
      }
    } catch (error) {
      setMessage({ message_info: "Error conexion bbdd" });
    }
  }
  return (
    <div>
      {values.loading === true ? (
        <Loading />
      ) : (
        <form autoComplete="off" noValidate {...props}>
          <Card>
            <CardHeader title="Información" />

            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="DNI del usuario"
                    label="Número de usuario"
                    name="nUser"
                    onChange={handleChange}
                    required
                    value={values.nUser}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="nameUser"
                    onChange={handleChange}
                    required
                    value={values.nameUser}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    name="surnameUser"
                    onChange={handleChange}
                    required
                    value={values.surnameUser}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Telefono"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Rol usuario"
                    name="roleUser"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.rolUser}
                    variant="outlined"
                  >
                    {values.states.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
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
              <Button
                color="primary"
                variant="text"
                onClick={handle_erasing}
              >
                <BinIcon sx={{ fontSize: 30, color: red[700] }} />
              </Button>
              

              <Button
                color="primary"
                variant="contained"
                onClick={handle_submit}
              >
                Guardar cambios
              </Button>
            </Box>
          </Card>
          <Box sx={{height: 20}}/>
          <p className="error">{message_info.message_info}</p>
        </form>
      )}
    </div>
  );
};
