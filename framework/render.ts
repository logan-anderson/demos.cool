import ReactDOMServer from "react-dom/server";
import path from "node:path";
import fs from "fs/promises";
import { ViteDevServer } from "vite";
import {
  injectPlugin,
  InjectPluginOptions,
  OverwriteRootOptions,
  overwriteRootPlugin,
} from "./astParser";
import { fileExists, getFiles } from "./file";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { ServerFrameworkContext } from "./frameworkContext";

type Options = { demos: string[] } & (
  | { dev?: false; url: string }
  | { dev: true; vite: ViteDevServer; url: string }
);

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

const mdToHtml = async (md: string) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(file);
};
/**
 * This processes a folder and returns the inner html that is generated.
 * It is generated based on the following rules (IN ORDER)
 *  - if page.html exists it is used as static HTML
 *  - if page.md exists it is converted to HTML and used
 *  - if entry-server exists the entry-server default export is used to render the HTML
 *  - if none of the above exists the inner html is an empty string (Totally fine, just means no SSR / SSG)
 *
 * @param folder the folder to get the inner html from
 */
const getInnerHtml = async (folder: string, opts: Options) => {
  const files = await getFiles(folder);
  const htmlFile = files.find((f) => f.type === "html");
  if (htmlFile && htmlFile.exists) {
    return htmlFile.content;
  }

  const mdFile = files.find((f) => f.type === "markdown");
  if (mdFile && mdFile.exists) {
    const html = await mdToHtml(mdFile.content);
    return html;
  }

  const serverEntry = files.find((f) => f.name === "entry-server.tsx");
  if (serverEntry && serverEntry.exists) {
    const mod = await loadModule(serverEntry.path, opts);
    const ctx = new ServerFrameworkContext().getInstance();
    ctx.resetProps();
    return (
      await mod.module.render({
        frameworkContext: ctx,
      })
    ).html;
  }

  console.warn(
    `No inner html found for ${folder} this means no SSR / SSG. If you want SSR / SSG please add a page.html, page.md or entry-server.tsx file`
  );

  return "";
};

/**
 *
 * @param opts options
 * @returns  a string of the layout html
 */
const getLayoutHtml = async (opts: Options) => {
  const layoutRes = await loadModule(
    path.join(process.cwd(), "rootLayout.tsx"),
    opts
  );
  let htmlTemplate = ReactDOMServer.renderToStaticMarkup(
    layoutRes.module.default({ demos: opts.demos, url: opts.url })
  );
  if (opts.dev) {
    htmlTemplate = await opts.vite.transformIndexHtml(opts.url, htmlTemplate);
  }
  return htmlTemplate;
};

export const getProcessor = ({
  injectOptions,
  overrideRootOptions,
}: {
  injectOptions: InjectPluginOptions;
  overrideRootOptions: OverwriteRootOptions;
}) => {
  return unified()
    .use(rehypeParse)
    .use(overwriteRootPlugin, overrideRootOptions)
    .use(injectPlugin, injectOptions)
    .use(rehypeStringify);
};

export const renderHtmlContent = async (folder: string, opts: Options) => {
  const layoutHtml = await getLayoutHtml(opts);
  const innerHtml = await getInnerHtml(folder, opts);

  const clientScriptPath = path.join(folder, "entry-client.tsx");
  const injectScript = (await fileExists(clientScriptPath)) && {
    path: clientScriptPath,
  };
  const rootPath = path.join(folder, "root.html");
  const overrideRootOptions: OverwriteRootOptions = (await fileExists(
    rootPath
  )) && {
    rootEl: await fs.readFile(rootPath, "utf-8"),
  };

  const vFile = await getProcessor({
    injectOptions: { innerHtml, injectScript },
    overrideRootOptions,
  }).process(layoutHtml);

  return String(vFile);
};
