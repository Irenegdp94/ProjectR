import { Redirect, Route } from "react-router";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ render: Render, ...rest }) => {
  console.log(window.localStorage.token)
  let token = localStorage.getItem("token");
  console.log(token)
  let [loading, setLoading] = useState({ loading: true });
  // let [message, setMessage] = useState({ message: "" });
  let history = useHistory();
  let verify = async () => {
    let response;
    
    
    try {
      response = await axios.get("http://localhost:5000/api/both/validate", {
        headers: { token: token },
      });
      if (response.data.auth === false) {
        // setMessage({ message:  });
        window.localStorage.clear();
        let message = response.data.message;
        console.log(message)
        history.push("/");
      }

      setLoading({ loading: false });
 
  
 
    } catch (error) {
      // setMessage({ message: "Server error" });
      // setLoading({ loading: false });
      history.push("/");
      return;
    }
   

    
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <Route {...rest}>
      {loading.loading === true ? <h1>loading true</h1> : <Render />}
    </Route>
  );
};

export default PrivateRoute;

//loading.loading === true ? <h1>loading true</h1> :<Render />