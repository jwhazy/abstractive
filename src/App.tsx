import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./pages/index";
import "./global.css";

ReactDOM.createRoot(
  document.getElementById("abstractive") as HTMLElement
).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
