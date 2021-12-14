// import * as React from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// // import { useDemoData } from '@mui/x-data-grid-generator';
import axios from "axios";
// import { useState, useEffect } from "react";
// import Nav from "../NavUser/Nav32User";
// import Loading from "../../components/Loading";

// export default function TableViewWorks() {
//   //   const { data } = useDemoData({
//   //     dataSet: 'Commodity',
//   //     rowLength: 100,
//   //     maxColumns: 6,
//   //   });
//   let datas = [];
// let [info, setInfo] = useState({ data: datas, loading: true });

//   const fresponse = async () => {
//     let token = localStorage.getItem("token");
//     let response = await axios.get("http://localhost:5000/api/user/userworks", {
//       headers: { token: token },
//     });

//     let datas = response.data.infoUser;
//     setInfo({ data: datas, loading: false });
//   };
//   useEffect(() => {
//     fresponse();
//   }, []);

//   return (
//     <div>
//       {info.loading === true ? (
//         <Loading />
//       ) : (
//         <div>
//           <Nav></Nav>

//           <div>hola

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// function loadServerRows(filterData) {
//   const array_obj = filterData.map((work) => {
//     return(
//       {id: work._id, dataINI: work.dateINI}

//     )

//   })
//   console.log(array_obj)
//   const serverRows = [
//     { id: '1', commodity: 'rice' },
//     { id: '2', commodity: 'soybeans' },
//     { id: '3', commodity: 'milk' },
//     { id: '4', commodity: 'wheat' },
//     { id: '5', commodity: 'oats' },
//   ];

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (!filterData) {
//         resolve(serverRows);
//         return;
//       }
//       resolve(
//         serverRows.filter(
//           (row) => row.commodity.toLowerCase().indexOf(filterData) > -1,
//         ),
//       );
//     }, Math.random() * 500 + 100); // simulate network latency
//   });
// }

// export default function ServerFilterGrid() {
//   const [columns] = React.useState([{ field: 'commodity', width: 150 }]);

//   const [rows, setRows] = React.useState([]);
//   const [filterValue, setFilterValue] = React.useState();
//   const [loading, setLoading] = React.useState(false);

//   const onFilterChange = React.useCallback((filterModel) => {
//     setFilterValue(filterModel.items[0].value);
//   }, []);

//   React.useEffect(() => {
//     let active = true;

//     (async () => {
//       setLoading(true);

//       let token = localStorage.getItem("token");
//           let response = await axios.get("http://localhost:5000/api/user/userworks", {
//             headers: { token: token },
//           });

//           let datas = response.data.infoWorkUser;
//           console.log(response)
//           console.log("datas", datas)

//       const newRows = await loadServerRows(filterValue);
//       // const newRows = await loadServerRows(datas);

//       if (!active) {
//         return;
//       }

//       setRows(newRows);
//       setLoading(false);
//     })();

//     return () => {
//       active = false;
//     };
//   }, [filterValue]);

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         filterMode="server"
//         onFilterModelChange={onFilterChange}
//         loading={loading}
//       />
//     </div>
//   );
// }

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

async function loadServerRows(commodityFilterValue) {
  let token = localStorage.getItem("token");
  let response = await axios.get("http://localhost:5000/api/user/userworks", {
    headers: { token: token },
  });

  let datas = response.data.infoWorkUser;
  console.log(response);
  console.log("datas", datas);

  const array_obj = datas.map((work) => {
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
    let horas = Math.abs(dateFIN - dateINI) / 3600000;

    let fincas = work.farm.map((farm) => {
      return farm.nameFarm;
    });

    let machineT = "";
    let m = work.machinery;
    console.log(m);
    m.forEach((machine) => {
      // machineT += " " + machine.nameMachinery;
      machineT += `${machine.nameMachinery}\n`
    });
    console.log(machineT);

    console.log("fincas", fincas);

    return {
      id: work._id,
      commodity: "rice",
      Fecha: fecha,
      De: horaINI,
      A: horaFIN,
      Horas: horas,
      Trabajador: work.worker.nameUser,
      Empresa: work.company[0].nameCompany,
      Finca: fincas,
      Tarea: work.task.nameTask,
      Deposito: work.tank.nameTank,
      Litros: work.litres_tank,
      Maquinaria: machineT,
    };
  });

  console.log(array_obj);
  // const serverRows = [
  //   { id: "1", commodity: "rice", Fecha: "hola" },
  //   { id: "2", commodity: "soybeans" },
  //   { id: "3", commodity: "milk" },
  //   { id: "4", commodity: "wheat" },
  //   { id: "5", commodity: "oats" },
  // ];

  return new Promise((resolve) => {
    setTimeout(() => {
      if (!commodityFilterValue) {
        resolve(array_obj);
        return;
      }
      resolve(
        array_obj.filter(
          (row) =>
            row.commodity.toLowerCase().indexOf(commodityFilterValue) > -1
            
        )
      );
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

export default function ServerFilterGrid() {
  const [columns] = React.useState([
    { field: "commodity", width: 150 },
    { field: "Fecha", width: 150 },
    { field: "De", width: 150 },
    { field: "A", width: 150 },
    { field: "Horas", width: 150 },
    { field: "Trabajador", width: 150 },
    { field: "Empresa", width: 150 },
    { field: "Finca", width: 150 },
    { field: "Tarea", width: 150 },
    { field: "Subtarea", width: 150 },
    { field: "Maquinaria", width: 150 },
    { field: "Deposito", width: 150 },
    { field: "Litros", width: 150 },
    { field: "Producto", width: 150 },
    { field: "Litros", width: 150 },
  ]);

  const [rows, setRows] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const onFilterChange = React.useCallback((filterModel) => {
    console.log(filterModel.items[0].value);
    setFilterValue(filterModel.items[0].value); //valor del filtro
  }, []);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      //

      const newRows = await loadServerRows(filterValue);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [filterValue]);

  return (
    <div style={{width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        loading={loading}
        pageSize={50}
        rowBuffer={10}
        autoHeight
        
      />
    </div>

    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
    //     <TableBody>
      //   <DataGrid
      //   rows={rows}
      //   columns={columns}
      //   filterMode="server"
      //   onFilterModelChange={onFilterChange}
      //   loading={loading}
      //   // pageSize={50}
      // />
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
