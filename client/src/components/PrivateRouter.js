import { Redirect, Route } from "react-router";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from './Loading';

const PrivateRoute = ({ render: Render, ...rest }) => {
  
  let token = localStorage.getItem("token");
  let [loading, setLoading] = useState({ loading: true });
  // let [message, setMessage] = useState({ message: "" });
  let history = useHistory();
  let verify = async () => {
    let response;
    try {
      response = await axios.get("http://localhost:5000/api/both/validate", {
        headers: { token: token },
      });
      console.log(response)
      if (response.data.auth === false) {
        // setMessage({ message:  });
        window.localStorage.clear();
        window.localStorage.message = response.data.message;

        history.push("/");
      }

      setLoading({ loading: false });
 
  
 
    } catch (error) {
      // setMessage({ message: "Server error" });
      history.push("/");
      return;
    }
   

    
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <Route {...rest}>
     
       {loading.loading === true ? <Loading/> : <Render />}
    </Route>
  );
};

export default PrivateRoute;

