import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";

const hydrateRoot = () => {
  console.log("hydrating root main");
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
};
const pathname = window.location.pathname;

window[`hydrateRoot-${pathname}`] = hydrateRoot;

hydrateRoot();
