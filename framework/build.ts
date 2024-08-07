import fs, { writeFile } from "node:fs/promises";
import path from "node:path";
import { build } from "vite";
import { renameBuildToIndex } from "./renameBuildToIndex";
import { renderHtmlContent } from "./render";
import { getDemos } from "./getDemos";
import { vitePlugins } from "./vitePlugins";
import { PAGES_FOLDER } from "./constants";
import { getPagesWithGlob } from "../lib/getPagesWithGlob";

// const __dirname = fileURLToPath(new URL(".", import.meta.url));

const buildAll = async () => {
  const root = process.cwd();
  const demos = getDemos(path.join(root, PAGES_FOLDER));
  const paths = getPagesWithGlob({});

  for (const currentPath of paths) {
    const folder = path.join(root, currentPath);
    const htmlContent = await renderHtmlContent(folder, {
      dev: false,
      url: currentPath.replace(PAGES_FOLDER + "/", "") + "/",
      demos,
    });
    const htmlFile = path.join(folder, "build.html");
    await writeFile(htmlFile, htmlContent);
  }

  /**
   * Makes an object for the vite input option
   *
   * Looks like this:
   * {
   *  main: "./path/to/main/build.html",
   *  demo1: "./path/to/demo1/build.html",
   *  demo2: "./path/to/demo2/build.html",
   *  ...
   * }
   */
  const input = paths.reduce((acc, p) => {
    const parts = p.split("/");
    const name = parts[parts.length - 1] || "main";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[name] = "./" + path.join(p, "build.html");
    return acc;
  }, {});

  await build({
    appType: "mpa",
    //   root: path.resolve(__dirname, "./project"),
    //   base: "/",
    build: {
      rollupOptions: {
        input,
      },
    },
    plugins: vitePlugins,
  });

  // rename all html in dist from build.html to index.html
  await renameBuildToIndex(path.join(root, "dist"));
  // copy everything from pages to dist and remove pages
  await fs.cp(path.join(root, "dist", PAGES_FOLDER), path.join(root, "dist"), {
    recursive: true,
  });
  await fs.rm(path.join(root, "dist", PAGES_FOLDER), { recursive: true });
};
buildAll();
