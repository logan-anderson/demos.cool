import React from "react";
import { Header } from "./src/components/header";

const Layout = ({ demos }: { demos: string[] }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="/src/global.css" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Default Layout</title>
        <script defer type="module" src="/src/router.ts"></script>
      </head>
      <body className="bg-brand-800 text-gray-200">
        <Header demos={demos} />
        <div className="max-w-7xl mx-auto">
          <div id="root"></div>
        </div>
      </body>
    </html>
  );
};
export default Layout;
