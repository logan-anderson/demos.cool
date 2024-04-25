import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "vite";
import { renameBuildToIndex } from "./renameBuildToIndex";
import { renderHtmlContent } from "./render";

// import { fileURLToPath } from "node:url";
// const __dirname = fileURLToPath(new URL(".", import.meta.url));

const buildHtmlFile = async (folder) => {
  const p = path.join(folder, "entry-server.tsx");
  const renderFunc = (await import(p)).render;
  const { html } = await renderFunc();
  const htmlTemplate = await readFile(
    path.join(folder, "layout.html"),
    "utf-8"
  );
  const htmlContent = htmlTemplate.replace("<!--app-html-->", html);

  // todo make html template and then replace the html with the rendered html
  const htmlFile = path.join(folder, "build.html");
  await writeFile(htmlFile, htmlContent);
};
const buildAll = async () => {
  const paths = ["", "demos/local-llm"];
  const root = process.cwd();
  const folders = paths.map((f) => path.join(root, f));
  for (const folder of folders) {
    await buildHtmlFile(folder);
    const htmlContent = await renderHtmlContent(folder, {
      dev: false,
      url: "asdf",
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
