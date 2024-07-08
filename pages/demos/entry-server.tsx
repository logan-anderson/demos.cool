import React from "react";
import ReactDOMServer from "react-dom/server";
import { getPagesWithGlob } from "../../lib/getPagesWithGlob";
import { PAGES_FOLDER } from "../../framework/constants";

export async function render() {
  const demos = getPagesWithGlob({ subFolder: "/demos" })
    .map((x) => x.replace(PAGES_FOLDER, ""))
    .map((x) => {
      return {
        name: x.replace("/demos", "").replace("/", ""),
        url: x,
      };
    })
    .filter((x) => Boolean(x.name));
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <h1>Demo Index Page</h1>
      <ul>
        {demos.map((demo) => (
          <li key={demo.url}>
            <a href={demo.url}>{demo.name}</a>
          </li>
        ))}
      </ul>
    </React.StrictMode>
  );
  return { html };
}
