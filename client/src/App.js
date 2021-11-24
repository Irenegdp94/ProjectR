// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Switch, Route} from "react-router-dom";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRouter';
import Homeadmin from './components/Homeadmin';
import Homeuser from './components/HomeUser';




function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=>{window.localStorage.clear(); return <Login/>}}/>
        <PrivateRoute exact path="/homeAdmin" render={()=>{ return <Homeadmin/>}}/>
        <PrivateRoute exact path="/homeUser" render={()=>{return <Homeuser/>}}/>

      </Switch>
    </div>
  );
}

export default App;
