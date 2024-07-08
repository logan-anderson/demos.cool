import React from "react";
import { Header } from "./src/components/header";

const Layout = ({ demos, url }: { demos: string[]; url: string }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="/src/global.css" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Demos.cool</title>
        <script defer type="module" src="/src/router.ts"></script>
      </head>
      {/* <body className="bg-gradient-to-r from-brand to-brand-50 text-gray-100"> */}
      <body className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-gray-100">
        <Header demos={demos} url={url} />
        <div className="max-w-7xl mx-auto">
          <div id="root"></div>
        </div>
      </body>
    </html>
  );
};
export default Layout;
