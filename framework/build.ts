// import path from "node:path";
// import { fileURLToPath } from "node:url";
import { build } from "vite";
// const __dirname = fileURLToPath(new URL(".", import.meta.url));

const buildAll = async () => {
  await build({
    //   root: path.resolve(__dirname, "./project"),
    //   base: "/",
    build: {
      rollupOptions: {
        input: {
          main: "./index.html",
          "local-llm": "./demos/local-llm/index.html",
        },
      },
    },
  });
};
buildAll();
