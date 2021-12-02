// import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/Accoun-profile'
import { AccountProfileDetails } from '../components/account/Account-profile-detail';
import { DashboardLayout } from '../components/account/Dashboard-layout';
import { useParams } from 'react-router';

const Account = () => {
  let id_user = useParams().id;
  // console.log(id_user)
  return(
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Perfil
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile id={id_user} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails  id={id_user} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  
  )
     

  };



export default Account;