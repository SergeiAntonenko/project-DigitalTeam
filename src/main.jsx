import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "components/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/project-DigitalTeam">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
