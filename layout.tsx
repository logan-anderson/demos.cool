import React from "react";
import { Header } from "./src/components/header";

const Layout = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="/src/global.css" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React</title>
        {/* <HtmlComment text="app-head" /> */}
      </head>
      <body className="bg-brand-800 text-gray-200">
        <Header />
        <div id="root"></div>
        <script type="module" src="/src/entry-client.tsx"></script>
      </body>
    </html>
  );
};
export default Layout;