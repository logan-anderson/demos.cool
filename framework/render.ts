import ReactDOMServer from "react-dom/server";
import path from "node:path";
import fs from "fs/promises";
import { ViteDevServer } from "vite";
import { insertIntoIdRoot } from "./astParser";

type Options = { demos: string[] } & (
  | { dev?: false; url: string }
  | { dev: true; vite: ViteDevServer; url: string }
);

const fileExists = async (path: string) => {
  try {
    await fs.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

const loadModule = async (module: string, options: Options) => {
  const exists = await fileExists(module);
  if (!exists) {
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
  const layoutRes = await loadModule(
    path.join(process.cwd(), "rootLayout.tsx"),
    opts
  );
  let htmlTemplate = ReactDOMServer.renderToStaticMarkup(
    layoutRes.module.default({ demos: opts.demos })
  );
  if (opts.dev) {
    htmlTemplate = await opts.vite.transformIndexHtml(opts.url, htmlTemplate);
  }
  const renderFunc = await getRenderFunction(folder, opts);
  const { html: innerHtml } = await renderFunc(opts.url);
  const clientScriptPath = path.join(folder, "entry-client.tsx");
  const clientScript = (await fileExists(clientScriptPath)) && {
    path: clientScriptPath,
  };

  const htmlContent = insertIntoIdRoot({
    outerHtml: htmlTemplate,
    innerHtml,
    injectScript: clientScript,
  });

  return htmlContent;
};
