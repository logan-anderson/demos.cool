// import fs from "node:fs/promises";
import express from "express";
import { createServer } from "vite";
// import { render } from "../src/entry-server";
import path from "node:path";
import { renderHtmlContent } from "./render";
import { getDemos } from "./getDemos";

const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const root = process.cwd();

const app = express();

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  base,
});

app.use(vite.middlewares);

app.use("*", async (req, res) => {
  try {
    if (
      req.originalUrl.endsWith(".tsx") ||
      req.originalUrl.endsWith(".ts") ||
      req.originalUrl.endsWith(".js")
    ) {
      const mod = await vite.transformRequest(req.originalUrl);
      return res
        .status(200)
        .set({ "Content-Type": "text/javascript" })
        .send(mod?.code);
    }
    const url = req.originalUrl.replace(base, "");

    let before = "";

    if (url.startsWith("demos")) {
      const pathAfterDemo = url
        .replace("demos", "")
        .split("/")
        .filter(Boolean)[0];

      before = path.join("demos", pathAfterDemo);
    }

    const beforePath = path.join(root, before);

    const demos = getDemos(root);

    const html = await renderHtmlContent(beforePath, {
      dev: true,
      vite,
      url,
      demos,
    });

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    console.error(e);
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
