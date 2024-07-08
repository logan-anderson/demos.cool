import React from "react";
import ReactDOMServer from "react-dom/server";
import { HomePage } from "../src/home/homePage";

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HomePage />
    </React.StrictMode>
  );
  return { html };
}
