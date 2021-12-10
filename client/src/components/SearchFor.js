import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Nav from "./Nav32-basic";
// import Resultsearch from "./Resultsearch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Searchfor = () => {
  const [criteria, setCriteria] = React.useState({
    type_search: "",
    nom: "",
  });
//   const [submit, setSubmit] = React.useState({submit:false})
const [info, setInfo] = useState({data:""});
const [message_info, setMessage] = useState({
    message_info: "",
  });

  
  const handle_change = (event) => {
    setCriteria({ ...criteria, [event.target.id]: event.target.value });
  };

  const handle_submit = async (event) => {
    event.preventDefault();
    console.log("boton");
    // setSubmit({submit:true})

    try {
        let token = localStorage.getItem("token");

        let response = await axios.post(
          "http://localhost:5000/api/admin/searchfor",
          criteria,
          {
            headers: { token: token },
          }
        );
        let datas = response.data.info.data
        setInfo({data: datas})
        setMessage({ message_info: response.data.message });
        // console.log("response", response.data.info)
        // console.log("info", info)
        console.log("data",datas)
      } catch (error) {
        window.localStorage.message = "Error del servidor";
      }

  };

  return (
    //   <h1>principal</h1>
    <div>
       {/* {console.log(submit, criteria)} */}
      <Nav />
      <h1>Buscar trabajo por</h1>
      <form onSubmit={handle_submit}>
        <select id="type_search" onChange={handle_change}>
          <option selected="true" disabled="disabled">
            Seleccione criterio de busqueda
          </option>
          <option name="trabajador" value="trabajador">
            Trabajador
          </option>
          <option name="empresa" value="empresa">
            Empresa
          </option>
          <option value="finca">Finca</option>
          <option value="maquinaria">Maquinaria</option>
          <option value="deposito">Depósito</option>
          <option value="tarea">Tarea</option>
          <option value="producto">Producto</option>
          <option value="campaña">Campaña</option>
        </select>

        <input id="nom" onChange={handle_change}></input>
        <button>Buscar</button>
      </form>
      <h1>Tabla</h1>
      {/* {submit.submit === false ? (
        <p>hola</p>
      ) : (
        <Resultsearch info_search={criteria} />
      )} */}

<TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell align="right">Empresa</TableCell>
                  <TableCell align="right">Finca</TableCell>
                  <TableCell align="right">Ha</TableCell>
                  <TableCell align="right">Cultivo</TableCell>
                  <TableCell align="right">Trabajador</TableCell>
                  <TableCell align="right">Tarea</TableCell>
                  <TableCell align="right">Subtarea</TableCell>
                  <TableCell align="right">Hora inicio</TableCell>
                  <TableCell align="right">Hora fin</TableCell>
                  <TableCell align="right">Maquinaria</TableCell>
                  <TableCell align="right">Productos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {info.data.map((row) => (
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
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
      
    </div>
  );
};

export default Searchfor;
