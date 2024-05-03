import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window[`hydrateRoot-${pathname}`] = hydrateRoot;

hydrateRoot();
