// import logo from './logo.svg';
import './App.css';

import {Switch, Route} from "react-router-dom";
import Login from './components/Login';
import Homeadmin from './components/Homeadmin';
import Homeuser from './components/HomeUser';




function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=>{return <Login/>}}/>
        <Route exact path="/homeAdmin" render={()=>{return <Homeadmin/>}}/>
        <Route exact path="/homeUser" render={()=>{return <Homeuser/>}}/>

      </Switch>
    </div>
  );
}

export default App;
