import { renderToString } from "vue/server-renderer";
import { createApp } from "./createApp";

export const render = async () => {
  const app = createApp();

  const res = await renderToString(app);

  return {
    html: res,
  };
};
