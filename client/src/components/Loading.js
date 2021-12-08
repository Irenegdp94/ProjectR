//CARGANDO...
import React from "react";
import "../styles/Loading.css";

const Loading = () => {
  // return (
  //   <div class="d-flex justify-content-center">
  //     <div class="m-5">
  //       <div class="spinner-border text-success m-5" role="status">
  //         <span class="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div class="d-flex justify-content-center">
      <div class="m-5">
        <div class="spinner2 spinnerMax">
          <div class="spinner2 spinnerMid">
            <div class="spinner2 spinnerMin"></div>
          </div>
        </div>
      </div>
    </div>

    // <div class="d-flex justify-content-center">
    //   <div class="m-5">

    //     <div class="spinner-border text-success m-5" role="status">
    //       <span></span>
    //     </div>
    //     <img height="60" src="../spinnertractor.png"></img>
    //   </div>
    // </div>
  );
};
export default Loading;
