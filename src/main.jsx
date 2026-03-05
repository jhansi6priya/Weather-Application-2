import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <WeatherProvider>
    <App />
  </WeatherProvider>
  </BrowserRouter>
);
