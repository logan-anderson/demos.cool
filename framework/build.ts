import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
// import { fileURLToPath } from "node:url";
import { build } from "vite";
// const __dirname = fileURLToPath(new URL(".", import.meta.url));

const buildHtmlFile = async (folder) => {
  const p = path.join(folder, "entry-server.tsx");
  console.log(p);
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
  const root = process.cwd();
  const folders = ["./", "./demos/local-llm"].map((f) => path.join(root, f));
  for (const folder of folders) {
    await buildHtmlFile(folder);
  }
  await build({
    //   root: path.resolve(__dirname, "./project"),
    //   base: "/",
    build: {
      rollupOptions: {
        input: {
          main: "./build.html",
          "local-llm": "./demos/local-llm/build.html",
        },
      },
    },
  });
};
buildAll();
