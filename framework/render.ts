import ReactDOMServer from "react-dom/server";
import path from "node:path";
import fs from "fs/promises";
import { ViteDevServer } from "vite";

type Options = { demos: string[] } & (
  | { dev?: false; url: string }
  | { dev: true; vite: ViteDevServer; url: string }
);

const loadModule = async (module: string, options: Options) => {
  try {
    await fs.stat(module);
  } catch (e) {
    return {
      success: false,
      error: new Error(`Module ${module} not found`),
    } as const;
  }
  if (options.dev) {
    const mod = await options.vite.ssrLoadModule(module);
    return {
      success: true,
      module: mod,
    } as const;
  }
  const mod = await import(module);
  return {
    success: true,
    module: mod,
  } as const;
};

const getRenderFunction = async (folder, options: Options) => {
  const p = path.join(folder, "entry-server.tsx");
  const res = await loadModule(p, options);
  if (!res.success) {
    return async () => {
      const html = await fs.readFile(path.join(folder, "page.html"), "utf-8");
      return {
        html,
      };
    };
  }
  const renderFunc = res.module.render;
  return renderFunc;
};

export const renderHtmlContent = async (folder, opts: Options) => {
  let layoutRes = await loadModule(path.join(folder, "layout.tsx"), opts);
  if (!layoutRes.success) {
    layoutRes = await loadModule(
      path.join(process.cwd(), "defaultLayout.tsx"),
      opts
    );
    if (!layoutRes.success) {
      throw layoutRes.error;
    }
  }
  let htmlTemplate = ReactDOMServer.renderToStaticMarkup(
    layoutRes.module.default({ demos: opts.demos })
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
