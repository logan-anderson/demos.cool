import React from "react";
import ReactDOMServer from "react-dom/server";

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <h1>Hello, World!</h1>
    </React.StrictMode>
  );
  return { html };
}
