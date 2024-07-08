import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./src/home/homePage";

const hydrateRoot = () => {
  console.log("hydrating root main");
  const el = document.getElementById("root");

  if (!el) {
    throw new Error("Root element not found");
  }
  ReactDOM.hydrateRoot(
    el,
    <React.StrictMode>
      <HomePage />
    </React.StrictMode>
  );
};
const pathname = window.location.pathname;

window[`hydrateRoot-${pathname}`] = hydrateRoot;

hydrateRoot();
