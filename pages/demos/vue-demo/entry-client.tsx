import { createApp } from "./createApp";

const hydrateRoot = () => {
  const app = createApp();
  app.mount("#root");
};

const pathname = window.location.pathname;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window[`hydrateRoot-${pathname}`] = hydrateRoot;

hydrateRoot();
