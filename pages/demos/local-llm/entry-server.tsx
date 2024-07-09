import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "./src/App";
import { getDemoProps } from "./getProps";
import type { AbstractFrameworkContext } from "../../../framework/frameworkContext";

export async function render({
  frameworkContext,
}: {
  frameworkContext: AbstractFrameworkContext;
}) {
  /**
   * This is bad DX but its the only way I can think of without having to make my own compiler system
   */

  const props = await getDemoProps();
  frameworkContext.addProps(props);

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App ctx={frameworkContext} />
    </React.StrictMode>
  );
  return { html };
}
