//NUEVo trabajo
// import * as React from "react";
// import axios from "axios";

// import { useHistory } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// import FormControl, { useFormControl } from "@mui/material/FormControl";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";

// import Nav from "../Nav32-basic";


// export default function Nework() {
//   window.localStorage.message = "";
//   const [open, setOpen] = React.useState(false);
//   const [options, setOptions] = React.useState([]);
//   const loading = open && options.length === 0;
//   const [inputValue, setInputValue] = React.useState({}); //para capturar valor
//   let history = useHistory();
//   const [open2, setOpen2] = React.useState(false);
//   const [options2, setOptions2] = React.useState([]);
//   const loading2 = open2 && options2.length === 0;
//   const [inputValue2, setInputValue2] = React.useState({}); //para capturar valor
//   const [message_info, setMessage] = React.useState({message_info: ""});
//   const [value, setValue] = React.useState(null);
//   const valNumRegex = /^\d*\.?\d*$/;


//     const [info, setInfo] = React.useState({
//       dateINI: "",
//       dateFIN: "",
//       company: [],
//       farm: [],
//       worker: "",
//       task: "",
//       machinery: [],
//       tank: "",
//       litres_tank: "",
//       products: [],
//       description: "",
      

//     });

//   React.useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return;
//     }

//     (async () => {
//       ////////////// aqui va la consulata a la bbdd (la lista desplegable)
//       let token = localStorage.getItem("token");
//       let response = await axios.get(
//         "http://localhost:5000/api/search/sseassons",
//         {
//           headers: { token: token },
//         }
//       );
//       let array_season = response.data.info;
//       ///////////////

//       if (active) {
//         setOptions([...array_season]); //el nombre de la lista
//       }
//     })();
//   }, [loading]);

//   React.useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);

//   //imput 2

//   React.useEffect(() => {
//     let active = true;

//     if (!loading2) {
//       return;
//     }

//     (async () => {
//       ////////////// aqui va la consulata a la bbdd (la lista desplegable)
//       let token = localStorage.getItem("token");
//       let response2 = await axios.get(
//         "http://localhost:5000/api/search/scompany",
//         {
//           headers: { token: token },
//         }
//       );
//       let array_company = response2.data.info;
//       ///////////////

//       if (active) {
//         setOptions2([...array_company]); //el nombre de la lista
//       }
//     })();
//   }, [loading2]);

//   React.useEffect(() => {
//     if (!open2) {
//       setOptions2([]);
//     }
//   }, [open2]);

//   const handle_change = (event) => {
//     setInfo({ ...info, [event.target.name]: event.target.value });
//   };

//   const handle_submit = async (event) => {
//     event.preventDefault();
//     if (!info.dateINI ||!info.dateFIN || !info.company || !info.farm || !info.worker || !info.task) {
//       event.stopPropagation();
//       setMessage({ message_info: "Introduce todos los campos obligatorios" });
//     } else {
//       try {
//         let token = localStorage.getItem("token");
//         for (let i in inputValue2) {
//           array_id_company.push(inputValue2[i]._id);
//         }
 
//         info.company = array_id_company;
//         info.season = inputValue._id;
//         let response = await axios.post(
//           "http://localhost:5000/api/admin/newfarm",
//           info,
//           {
//             headers: { token: token },
//           }
//         );
//         setMessage({ message_info: response.data.message });
//         if (response.data.success === true) {
//           window.localStorage.message = response.data.message;
//           history.push("/homeAdmin");
//         }
//       } catch (error) {
//         window.localStorage.message = "error catch";
//       }
//     }
//   };




//   return (
//     <div>
//       <Nav></Nav>
//       <h1>Crear finca</h1>
//       <Box component="form" Validate autoComplete="off">
//         <FormControl>

//         <Box
//           component="form"
//           sx={{
//             "& > :not(style)": { m: 1, width: "25ch" },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               id="datePurchase"
//               inputFormat="dd/MM/yyyy"
//               // views={['day', 'month', 'year']}
//               label="Fecha de compra"
//               value={value}
//               onChange={(newValue) => {
//                 setValue(newValue);
//               }}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </LocalizationProvider>
//         </Box>




//           <TextField
//             color="secondary"
//             id="outlined-basic"
//             name="nameFarm"
//             label="Nombre finca"
//             variant="outlined"
//             sx={{ width: 300 }}
//             onChange={handle_change}
//           />
//           <Box sx={{ height: 20 }} />

//           <TextField
//             color="secondary"
//             id="outlined-basic"
//             name="area"
//             label="Área"
//             variant="outlined"
//             sx={{ width: 300 }}
//             onChange={handle_change}
//           />
//           <Box sx={{ height: 20 }} />

//           <TextField
//             color="secondary"
//             id="outlined-basic"
//             name="cultivo"
//             label="Cultivo"
//             variant="outlined"
//             sx={{ width: 300 }}
//             onChange={handle_change}
//           />
//           <Box sx={{ height: 20 }} />

//           <Autocomplete
//             id="asynchronous-demo"
//             sx={{ width: 300 }}
//             open={open}
//             onOpen={() => {
//               setOpen(true);
//             }}
//             onClose={() => {
//               setOpen(false);
//             }}
//             onChange={(event, newInputValue) => {
//               setInputValue({ ...newInputValue });

//               //inputValue es el valor del input final
//             }}
//             isOptionEqualToValue={(option, value) => option.name === value.name}
//             getOptionLabel={(option) => option.name}
//             options={options}
//             loading={loading}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Campaña"
//                 InputProps={{
//                   ...params.InputProps,
//                   endAdornment: (
//                     <React.Fragment>
//                       {loading ? (
//                         <CircularProgress color="inherit" size={20} />
//                       ) : null}
//                       {params.InputProps.endAdornment}
//                     </React.Fragment>
//                   ),
//                 }}
//               />
//             )}
//           />
//           <Box sx={{ height: 20 }} />
//           <Autocomplete
//             multiple
//             id="asynchronous-demo2"
//             sx={{ width: 300 }}
//             open={open2}
//             onOpen={() => {
//               setOpen2(true);
//             }}
//             onClose={() => {
//               setOpen2(false);
//             }}
//             onChange={(event, newInputValue2) => {
//               setInputValue2({ ...newInputValue2 });

//               //inputValue es el valor del input final
//             }}
//             isOptionEqualToValue={(option2, value) =>
//               option2.nameCompany === value.nameCompany
//             }
//             getOptionLabel={(option2) => option2.nameCompany}
//             options={options2}
//             loading={loading2}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Empresa"
//                 InputProps={{
//                   ...params.InputProps,
//                   endAdornment: (
//                     <React.Fragment>
//                       {loading ? (
//                         <CircularProgress color="inherit" size={20} />
//                       ) : null}
//                       {params.InputProps.endAdornment}
//                     </React.Fragment>
//                   ),
//                 }}
//               />
//             )}
//           />
//           <Box sx={{ height: 20 }} />

//           <Stack spacing={2} direction="row">
//             <Button
//               type="submit"
//               variant="contained"
//               color="secondary"
//               onClick={handle_submit}
//             >
//               Crear
//             </Button>
//           </Stack>
//         </FormControl>
//       </Box>
//       <div>
//         <p className="error" id="message_info">
//           {message_info.message_info}
//         </p>
//       </div>
//     </div>
//   );
// }

// // Top films as rated by IMDb users. http://www.imdb.com/chart/top
// const topFilms = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
//   { title: "12 Angry Men", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
//   {
//     title: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },
//   { title: "The Good, the Bad and the Ugly", year: 1966 },
//   { title: "Fight Club", year: 1999 },
//   {
//     title: "The Lord of the Rings: The Fellowship of the Ring",
//     year: 2001,
//   },
//   {
//     title: "Star Wars: Episode V - The Empire Strikes Back",
//     year: 1980,
//   },
//   { title: "Forrest Gump", year: 1994 },
//   { title: "Inception", year: 2010 },
//   {
//     title: "The Lord of the Rings: The Two Towers",
//     year: 2002,
//   },
//   { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { title: "Goodfellas", year: 1990 },
//   { title: "The Matrix", year: 1999 },
//   { title: "Seven Samurai", year: 1954 },
//   {
//     title: "Star Wars: Episode IV - A New Hope",
//     year: 1977,
//   },
//   { title: "City of God", year: 2002 },
//   { title: "Se7en", year: 1995 },
//   { title: "The Silence of the Lambs", year: 1991 },
//   { title: "It's a Wonderful Life", year: 1946 },
//   { title: "Life Is Beautiful", year: 1997 },
//   { title: "The Usual Suspects", year: 1995 },
//   { title: "Léon: The Professional", year: 1994 },
//   { title: "Spirited Away", year: 2001 },
//   { title: "Saving Private Ryan", year: 1998 },
//   { title: "Once Upon a Time in the West", year: 1968 },
//   { title: "American History X", year: 1998 },
//   { title: "Interstellar", year: 2014 },
// ];
