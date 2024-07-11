import type { PluginOption } from "vite";
import vuePlugin from "@vitejs/plugin-vue";

export const vitePlugins = [
  vuePlugin(),
  {
    name: "add-data-reload-script-attr",
    enforce: "post",
    transformIndexHtml(html) {
      return html.replace(new RegExp("<script", "g"), `<script data-reload`);
    },
  } as PluginOption,
];
