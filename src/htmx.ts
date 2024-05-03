import * as htmx from "htmx.org";

htmx.logAll();

// TODO: this should probably use on("htmx:load") and look for a script tag with certain

htmx.on("htmx:afterSettle", () => {
  console.log("htmx:afterSettle custom");
  const pathname = window.location.pathname;

  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    typeof window[`hydrateRoot-${pathname}`] === "function"
  ) {
    console.log("hydrating root");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window[`hydrateRoot-${pathname}`]();
  }
});
