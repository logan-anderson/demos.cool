import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const el = document.getElementById("root");

if (!el) {
  throw new Error("Root element not found");
}

ReactDOM.hydrateRoot(
  el,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
