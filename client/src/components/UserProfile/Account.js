// import Head from 'next/head';
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "./Accoun-profile";
import { AccountProfileDetails } from "./Account-profile-detail";
// import { DashboardLayout } from '../components/account/Dashboard-layout';
import { useParams } from "react-router";
import Nav from "../Nav32-basic"
const Account = () => {
  let id_user = useParams().id;
  window.localStorage.message = "";

  return (
    <div>
      <Nav/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Perfil
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile id={id_user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails id={id_user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Account;
