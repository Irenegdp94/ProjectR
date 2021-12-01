//INICIO DE SESION
import "../styles/Login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Login = () => {
  // let state = useState({nUser:"", passUser:""})
  // let info = state[0];
  // let setInfo = state[1];
  //las tres lineas de arriba es igual que la de abajo:
  let [info, setInfo] = useState({ nUser: "", pass: "" });
  let [message_info, setMessage] = useState({ message_info: window.localStorage.message });
  window.localStorage.message = "";
  let history = useHistory();

  const handle_submit = async (event) => {
    event.preventDefault();
    //axios.post("http://localhost:5000/api/auth/login",body, headers)
    let response = await axios.post(
      "http://localhost:5000/api/auth/login",
      info
    ); //hace lo mismo que el fetch
    let { auth, message, token, rol } = response.data;

    if (auth & (rol === "ADMIN")) {
      localStorage.setItem("token", token);
      window.localStorage.message = "";
      history.push("/homeAdmin");
    } else if (auth & (rol === "USER")) {
      localStorage.setItem("token", token);
      window.localStorage.message = "";
      history.push("/homeUser");
    } else if (!auth) {
      setMessage({ message_info: message });
    }
  };

  const handle_change = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handle_submit} className="login-box">
      <img src="../tractor.png" class="avatar" alt="Avatar Image"/>
      <div>
        <label>Número de usuario</label>
        <input type="text" name="nUser" onChange={handle_change} />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" name="pass" onChange={handle_change} />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
      <div>
        <p className="error" id="message_info">{message_info.message_info}</p>
      </div>
    </form>
  );
};

export default Login;
