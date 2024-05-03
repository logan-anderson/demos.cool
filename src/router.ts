import flamethrower from "flamethrower-router";
export const router = flamethrower({ log: true });

window.addEventListener("flamethrower:router:end", () => {
  console.log("router end");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof window[`hydrateRoot-${window.location.pathname}`] === "function") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window[`hydrateRoot-${window.location.pathname}`]();
  }
});
