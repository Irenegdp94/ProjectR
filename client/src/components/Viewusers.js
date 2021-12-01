import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Nav from "./Navbar-basic";
import { useState, useEffect } from "react";

export default function DenseTable() {
  let [info, setInfo] = useState({data: []});
  const fresponse = async () => {
    let token = localStorage.getItem("token");
    let response = await axios.get(
      "http://localhost:5000/api/admin/viewusers",
      {
        headers: { token: token },
      }
    );
   
    let datas = response.data.infoUser;
    setInfo({data: datas});
  };
  useEffect(() => {
    fresponse();
  }, []);

  return (
    <div>
      <Nav/>
      <h1>Usuarios</h1>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Número de usuario</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Teléfono</TableCell>
            <TableCell align="right">ROL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.data.map((row) => (
            <TableRow
            //   key={info.data.nUser}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nUser}
              </TableCell>
              <TableCell align="right">{row.nameUser}</TableCell>
              <TableCell align="right">{row.surnameUser}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.roleUser}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
