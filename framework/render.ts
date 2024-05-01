import ReactDOMServer from "react-dom/server";
import path from "node:path";
import { ViteDevServer } from "vite";

type Options = { demos: string[] } & (
  | { dev?: false; url: string }
  | { dev: true; vite: ViteDevServer; url: string }
);

const loadModule = async (module: string, options: Options) => {
  if (options.dev) {
    const mod = await options.vite.ssrLoadModule(module);
    return mod;
  }
  const mod = await import(module);
  return mod;
};

const getRenderFunction = async (folder, options: Options) => {
  const p = path.join(folder, "entry-server.tsx");
  const mod = await loadModule(p, options);
  const renderFunc = mod.render;
  return renderFunc;
};

export const renderHtmlContent = async (folder, opts: Options) => {
  const layout = await loadModule(path.join(folder, "layout.tsx"), opts);
  let htmlTemplate = ReactDOMServer.renderToStaticMarkup(
    layout.default({ demos: opts.demos })
  );
  if (opts.dev) {
    htmlTemplate = await opts.vite.transformIndexHtml(opts.url, htmlTemplate);
  }
  const renderFunc = await getRenderFunction(folder, opts);
  const { html } = await renderFunc(opts.url);
  const el = '<div id="root">';
  const entryPoint = htmlTemplate.indexOf(el) + el.length;
  const htmlContent =
    htmlTemplate.slice(0, entryPoint) + html + htmlTemplate.slice(entryPoint);

  return htmlContent;
};
