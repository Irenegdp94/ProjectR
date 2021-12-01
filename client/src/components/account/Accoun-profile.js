import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const user = {
  avatar: "",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

export const AccountProfile = (props) => {
  let id_user = props.id
  console.log(id_user)
  let [info, setInfo] = useState({ data: {} , loading: true });
  let token = localStorage.getItem("token");
  const fresponse = async () => {
    let response = await axios.get(`http://localhost:5000/api/admin/viewOneuser/${id_user}`, {
      headers: { token: token },
    });
    
    let user_data = response.data.infoUser
    setInfo({data: user_data ,loading: false});
    console.log(info.data)
  }
  useEffect(() => {
    fresponse();
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
          {`${info.data.nameUser} ${info.data.surnameUser}`}
            
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`nº usuario: ${info.data.nUser}`}
          </Typography>

          <Typography color="textSecondary" variant="body1">
            {`Teléfono: ${info.data.phone}`}
          </Typography>

          <Typography color="textSecondary" variant="body1">
            {`rol: ${info.data.roleUser}`}
          </Typography>

        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};
