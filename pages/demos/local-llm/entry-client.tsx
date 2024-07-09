import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./src/App";
import { FrontendFrameworkContext } from "../../../framework/frontend";

const hydrateRoot = () => {
  const el = document.getElementById("root");

  if (!el) {
    throw new Error("Root element not found");
  }
  const ctx = new FrontendFrameworkContext();

  ReactDOM.hydrateRoot(
    el,
    <React.StrictMode>
      <App ctx={ctx} />
    </React.StrictMode>
  );
};
const pathname = window.location.pathname;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window[`hydrateRoot-${pathname}`] = hydrateRoot;

hydrateRoot();
