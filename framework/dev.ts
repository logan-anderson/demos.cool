import express from "express";
import { createServer } from "vite";
import path from "node:path";
import { renderHtmlContent } from "./render";
import { getDemos } from "./getDemos";
import { vitePlugins } from "./vitePlugins";
import { PAGES_FOLDER } from "./constants";

const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const root = process.cwd();

const app = express();

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  base,
  plugins: vitePlugins,
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
    const pagePath = path.join(root, PAGES_FOLDER, url);

    const html = await renderHtmlContent(pagePath, {
      dev: true,
      vite,
      url,
      // TODO: Remove demos from the framework. It should be the responsibility of the user to provide demos
      demos: getDemos(path.join(root, PAGES_FOLDER)),
    });

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e: unknown) {
    console.error(e);
    vite?.ssrFixStacktrace(e as Error);
    res.status(500).end(e as string);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
