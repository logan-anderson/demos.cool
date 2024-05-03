import type { PluginOption } from "vite";

// const addCustomScriptTag: PluginOption = {
//   name: "add-custom-script-tag",
//   transformIndexHtml: (html, opts) => {
//     console.log({
//       opts,
//     });
//     return [
//       {
//         tag: "script",
//         injectTo: "body",
//         attrs: {
//           "data-reload": true,
//           type: "module",
//           src: "/demos/local-llm/src/entry-client.tsx",
//         },
//       },
//     ];
//   },
// };

export const vitePlugins = [
  {
    name: "add-data-reload-script-attr",
    enforce: "post",
    transformIndexHtml(html) {
      return html.replace(new RegExp("<script", "g"), `<script data-reload`);
    },
  } as PluginOption,
];
