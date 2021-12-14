import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

import Nav from "../Nav32-basic";
import Loading from "../Loading";



export default function DenseTable() {
  let [info, setInfo] = useState({ data: [], loading: true });
  let [open, setOpen] = useState(true);

  const fresponse = async () => {
    let token = localStorage.getItem("token");
    let response = await axios.get(
      "http://localhost:5000/api/admin/viewusers",
      {
        headers: { token: token },
      }
    );

    let datas = response.data.infoUser;
    setInfo({ data: datas, loading: false });
  };
  useEffect(() => {
    fresponse();
  }, []);

  return (
    <div>
      {info.loading === true ? (
        <div>
          <Nav/>
          <Loading />
        </div>
      ) : (
        <div>
          <Nav />
          <h1>Usuarios</h1>

          <Box sx={{ width: "100%" }}>
        {window.localStorage.message !== "" ? (
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    window.localStorage.message = "";
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {window.localStorage.message}
            </Alert>
          </Collapse>
        ) : (
          (window.localStorage.message = "")
        )}
      </Box>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Número de usuario</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellido</TableCell>
                  <TableCell align="right">Teléfono</TableCell>
                  <TableCell align="right">ROL</TableCell>
                  <TableCell align="right">...</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {info.data.map((row) => (
                  <TableRow
                    //   key={info.data.nUser}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nUser}
                    </TableCell>
                    <TableCell align="right">{row.nameUser}</TableCell>
                    <TableCell align="right">{row.surnameUser}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.roleUser}</TableCell>
                    <TableCell align="right">
                      <Button href={`/viewuser/${row._id}`}>
                        <InfoOutlinedIcon color="secondary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      
    </div>
  );
}
