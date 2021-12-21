// https://mui.com/components/tables/#main-content

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";
import Nav from "../Nav32-basic";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

export default function DenseTable() {
  let [info, setInfo] = useState({ data: [], loading: true });
  let [open, setOpen] = useState(true);



  const fresponse = async () => {
    let token = localStorage.getItem("token");
    let response = await axios.get("http://localhost:5000/api/user/userworks", {
      headers: { token: token },
    });

    let datas = response.data.infoWorkUser;
    console.log(datas);
    setInfo({ data: datas, loading: false });
  };
  useEffect(() => {
    fresponse();
  }, []);

  return (
    <div>
      {info.loading === true ? (
        <div>
          <Nav />
          <Loading />
        </div>
      ) : (
        <div>
          <Nav />
          <h1>Trabajos</h1>

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
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">De</TableCell>
                  <TableCell align="center">A</TableCell>
                  <TableCell align="center">Horas</TableCell>
                  <TableCell align="center">Trabajador</TableCell>
                  <TableCell align="center">Empresa</TableCell>
                  <TableCell align="center">Finca</TableCell>
                  <TableCell align="center">Tarea</TableCell>
                  {/* <TableCell align="center">Subtarea</TableCell> */}
                  <TableCell align="center">Maquinaria</TableCell>
                  <TableCell align="center">Deposito</TableCell>
                  <TableCell align="center">Litros</TableCell>
                  <TableCell align="center">Productos</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {info.data.map((work) => {
                  let dateINI = new Date(work.dateINI);
                  let fecha = new Intl.DateTimeFormat("es", {
                    day: "2-digit",
                    year: "numeric",
                    month: "2-digit",
                  }).format(dateINI);
                  let horaINI = new Intl.DateTimeFormat("es", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(dateINI);
                  let dateFIN = new Date(work.dateFIN);
                  let horaFIN = new Intl.DateTimeFormat("es", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(dateFIN);
                  let horas = (Math.abs(dateFIN - dateINI) / 3600000).toFixed(
                    2
                  );
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{fecha}</TableCell>
                      <TableCell align="right">{horaINI}</TableCell>
                      <TableCell align="right">{horaFIN}</TableCell>
                      <TableCell align="right">{horas}</TableCell>
                      <TableCell align="right">
                        {work.worker.nameUser}
                      </TableCell>
                      <TableCell align="right">
                        {work.company.map((empresa) => {
                   
                          return (
                            <TableRow align="right">
                              {empresa.nameCompany}
                            </TableRow>
                          );
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {work.farm.map((finca) => {
                    
                          return (
                            <TableRow align="right">{finca.nameFarm}</TableRow>
                          );
                        })}
                      </TableCell>
                      <TableCell align="right">{work.task.nameTask}</TableCell>
                      <TableCell align="right">
                        {work.machinery.map((machine) => (
                          <TableRow align="right">
                            {machine.nameMachinery}
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell align="right">{work.tank.nameTank}</TableCell>
                      <TableCell align="right">{work.litres_tank}</TableCell>
                      <TableCell align="right">
                        {work.products.map((producto) => {
                          
                          return (
                            <TableRow align="right" >
                              <TableCell align="right" sx={{border:"0px"}}>
                                {producto.name_pr}
                              </TableCell>
                              <TableCell align="right" sx={{border:"0px"}}>
                                {producto.litres}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableCell>
                        {console.log(work._id)}
                      <TableCell align="right">
                      <Button href={`/userwork/${work._id}`}>
                        <InfoOutlinedIcon color="secondary"/>
                      </Button>
                    </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
