import fs from "node:fs/promises";
import express from "express";
import { createServer } from "vite";
import { render } from "../src/entry-server";
import path from "node:path";

const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const app = express();

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  base,
});

app.use(vite.middlewares);

app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    console.log({ foo: url });
    let before = "";

    if (url.startsWith("demos")) {
      const pathAfterDemo = url
        .replace("demos", "")
        .split("/")
        .filter(Boolean)[0];

      before = path.join("demos", pathAfterDemo);
    }
    let template: string = await fs.readFile(
      path.join(before, "index.html"),
      "utf-8"
    );
    template = await vite.transformIndexHtml(url, template);

    const rendered = await render();

    const html = template
      //   .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
