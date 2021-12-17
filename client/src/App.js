// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Switch, Route} from "react-router-dom";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRouter';
import Homeadmin from './components/Homeadmin';
import Homeuser from './components/HomeUser';
import Signup from './components/Signup';
import Newcompany from './components/Newcompany';
import Newfarm from './components/Newfarm';
import Viewusers from './components/ADMIN/Viewusers'
import Viewuser from './components/UserProfile/Account'
import Newmachine from "./components/Newmachine"
import Newtank from "./components/Newtank"
import Searchfor from "./components/SearchFor"
import TableViewWorks from "./components/USER/Table"
import ViewCompanies from './components/ADMIN/Viewcompanies';
import ViewFarms from './components/ADMIN/Viewfarms';
import ViewMachines from './components/ADMIN/Viewmachines';
import ViewTanks from "./components/ADMIN/Viewtanks"
import ViewTask from "./components/ADMIN/Viewtask"
import Viewproducts from "./components/ADMIN/Viewproducts"
import Newtask from "./components/ADMIN/Newtask"
import Newproduct from './components/ADMIN/Newproduct';
import Nework from './components/Nework';
import Userwork from "./components/USER/Userwork";




function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=>{window.localStorage.token = null; return <Login/>}}/>
        <PrivateRoute exact path="/homeAdmin" render={()=>{ return <Homeadmin/>}}/>
        <PrivateRoute exact path="/homeUser" render={()=>{return <Homeuser/>}}/>
        <PrivateRoute exact path="/signup" render={()=>{return <Signup/>}}/>
        <PrivateRoute exact path="/newcompany" render={()=>{return <Newcompany/>}}/>
        <PrivateRoute exact path="/newfarm" render={()=>{return <Newfarm/>}}/>
        <PrivateRoute exact path="/viewusers" render={()=>{return <Viewusers/>}}/>
        <PrivateRoute exact path="/viewuser/:id" render={()=>{return <Viewuser/>}}/>
        <PrivateRoute exact path="/newmachine" render={()=>{return <Newmachine/>}}/>
        <PrivateRoute exact path="/newtank" render={()=>{return <Newtank/>}}/>
        <PrivateRoute exact path="/searchfor" render={()=>{return <Searchfor/>}}/>
        <PrivateRoute exact path="/vieworks" render={()=>{return <TableViewWorks/>}}/>
        <PrivateRoute exact path="/viewcompanies" render={()=>{return <ViewCompanies/>}}/>
        <PrivateRoute exact path="/viewfarms" render={()=>{return <ViewFarms/>}}/>
        <PrivateRoute exact path="/viewmachines" render={()=>{return <ViewMachines/>}}/>
        <PrivateRoute exact path="/viewtanks" render={()=>{return <ViewTanks/>}}/>
        <PrivateRoute exact path="/viewtask" render={()=>{return <ViewTask/>}}/>
        <PrivateRoute exact path="/viewproducts" render={()=>{return <Viewproducts/>}}/>
        <PrivateRoute exact path="/newtask" render={()=>{return <Newtask/>}}/>
        <PrivateRoute exact path="/newproduct" render={()=>{return <Newproduct/>}}/>
        <PrivateRoute exact path="/nework" render={()=>{return <Nework/>}}/>
        <PrivateRoute exact path="/userwork/:id" render={()=>{return <Userwork/>}}/>
      </Switch>
    </div>
  );
}

export default App;
