import { writeFile } from "node:fs/promises";
import path from "node:path";
import { build } from "vite";
import { renameBuildToIndex } from "./renameBuildToIndex";
import { renderHtmlContent } from "./render";
import { getDemos } from "./getDemos";

// const __dirname = fileURLToPath(new URL(".", import.meta.url));

const buildAll = async () => {
  const root = process.cwd();
  const demos = getDemos(root);
  const demosWithFolder = demos.map((d) => path.join("demos", d));
  const paths = ["", ...demosWithFolder];

  for (const folder of paths) {
    const currentFolder = path.join(root, folder);

    const htmlContent = await renderHtmlContent(currentFolder, {
      dev: false,
      url: "asdf",
      demos,
    });
    const htmlFile = path.join(folder, "build.html");
    await writeFile(htmlFile, htmlContent);
  }
  const input = paths.reduce((acc, p) => {
    const parts = p.split("/");
    const name = parts[parts.length - 1] || "main";
    acc[name] = "./" + path.join(p, "build.html");
    return acc;
  }, {});

  await build({
    //   root: path.resolve(__dirname, "./project"),
    //   base: "/",
    build: {
      rollupOptions: {
        input,
      },
    },
  });

  // rename all html in dist from build.html to index.html
  await renameBuildToIndex(path.join(root, "dist"));
};
buildAll();
