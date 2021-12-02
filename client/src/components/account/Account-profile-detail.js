import { useState, useEffect } from "react";
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

const states = [
  {
    value: "USER",
    label: "USER",
  },
  {
    value: "ADMIN",
    label: "ADMIN",
  },
];

export const AccountProfileDetails = (props) => {
  let id_user = props.id;
  let token = localStorage.getItem("token");
  const [values, setValues] = useState({
    nUser: "",
    nameUser: "",
    surnameUser: "",
    phone: "",
    roleUser: "",
    loading: true
  });
  const fresponse = async () => {
    let response = await axios.get(
      `http://localhost:5000/api/admin/viewOneuser/${id_user}`,
      {
        headers: { token: token },
      }
    );

    let user_data = response.data.infoUser;
    console.log(user_data)
    setValues =({
      nUser: user_data.nUser,
      nameUser: user_data.nameUser,
      surnameUser: user_data.surnameUser,
      phone: user_data.phone,
      roleUser: user_data.roleUser,
      loading: false
    });
  };
  useEffect(() => {
    fresponse();
  }, []);
console.log(values)
  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //     loading: false
  //   });
  // };

  return (
    <h1>hola</h1>
    // <form autoComplete="off" noValidate {...props}>
    //   <Card>
    //     <CardHeader
    //       // subheader="The information can be edited"
    //       title="Información"
    //     />
    //     <Divider />
    //     <CardContent>
    //       <Grid container spacing={3}>
    //         <Grid item md={6} xs={12}>
    //           <TextField
    //             fullWidth
    //             helperText="DNI del usuario"
    //             label="Número de usuario"
    //             name="nUser"
    //             onChange={handleChange}
    //             required
    //             value={values.nUser}
    //             variant="outlined"
    //           />
    //         </Grid>
    //         <Grid item md={6} xs={12}>
    //           <TextField
    //             fullWidth
    //             label="Nombre"
    //             name="nameUser"
    //             onChange={handleChange}
    //             required
    //             value={values.nameUser}
    //             variant="outlined"
    //           />
    //         </Grid>

    //         <Grid item md={6} xs={12}>
    //           <TextField
    //             fullWidth
    //             label="Apellido"
    //             name="surnameUser"
    //             onChange={handleChange}
    //             required
    //             value={values.surnameUser}
    //             variant="outlined"
    //           />
    //         </Grid>

    //         <Grid item md={6} xs={12}>
    //           <TextField
    //             fullWidth
    //             label="Telefono"
    //             name="phone"
    //             onChange={handleChange}
    //             type="number"
    //             value={values.phone}
    //             variant="outlined"
    //           />
    //         </Grid>

    //         <Grid item md={6} xs={12}>
    //           <TextField
    //             fullWidth
    //             label="Rol usuario"
    //             name="rolUser"
    //             onChange={handleChange}
    //             required
    //             select
    //             SelectProps={{ native: true }}
    //             value={values.rolUser}
    //             variant="outlined"
    //           >
    //             {states.map((option) => (
    //               <option key={option.value} value={option.value}>
    //                 {option.label}
    //               </option>
    //             ))}
    //           </TextField>
    //         </Grid>
    //       </Grid>
    //     </CardContent>
    //     <Divider />
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "flex-end",
    //         p: 2,
    //       }}
    //     >
    //       <Button color="primary" variant="contained">
    //         Save details
    //       </Button>
    //     </Box>
    //   </Card>
    // </form>
  );
};
