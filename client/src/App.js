// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Switch, Route} from "react-router-dom";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRouter';
import Homeadmin from './components/Homeadmin';
import Homeuser from './components/HomeUser';
import Signup from './components/Signup';
import Newcompany from './components/CustomizeHookDelay';
import Newfarm from './components/prueba2';




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
          
      </Switch>
    </div>
  );
}

export default App;
