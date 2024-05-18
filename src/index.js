import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.css";
import "./styling/header-styling.scss";
import "./styling/index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);