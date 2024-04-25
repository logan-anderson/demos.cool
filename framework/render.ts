import { readFile } from "node:fs/promises";
import path from "node:path";
import { ViteDevServer } from "vite";

type Options =
  | { dev?: false; url: string }
  | { dev: true; vite: ViteDevServer; url: string };

const getRenderFunction = async (folder, options: Options) => {
  const p = path.join(folder, "entry-server.tsx");
  if (options.dev) {
    const { render } = await options.vite.ssrLoadModule(p);
    console.log({ render });
    return render;
  }
  const renderFunc = (await import(p)).render;
  return renderFunc;
};

export const renderHtmlContent = async (folder, opts: Options) => {
  let htmlTemplate = await readFile(path.join(folder, "layout.html"), "utf-8");
  if (opts.dev) {
    htmlTemplate = await opts.vite.transformIndexHtml(opts.url, htmlTemplate);
  }
  const renderFunc = await getRenderFunction(folder, opts);
  const { html } = await renderFunc(opts.url);
  console.log({ html });

  const htmlContent = htmlTemplate.replace("<!--app-html-->", html);

  return htmlContent;
};
