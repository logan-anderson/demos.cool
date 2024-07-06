import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";

export const insertIntoIdRoot = ({
  outerHtml,
  innerHtml,
  injectScript,
}: {
  outerHtml: string;
  innerHtml: string;
  injectScript?:
    | {
        path: string;
      }
    | false;
}) => {
  const hast = fromHtml(outerHtml);
  const innerElArr = fromHtml(innerHtml).children.filter(
    (x) => x.type === "element"
  );
  if (innerElArr === undefined || innerElArr.length === 0) {
    throw new Error("inner element not found");
  }

  visit(hast, "element", (node) => {
    if (node.tagName === "body" && injectScript) {
      node.children.push({
        type: "element",
        tagName: "script",
        properties: {
          "data-reload": true,
          type: "module",
          src: injectScript.path,
        },
        children: [],
      });
    }
    if (
      node.tagName === "div" &&
      node.properties.id === "root" &&
      node.children.length === 0
    ) {
      node.children.push(...innerElArr);
    }
  });

  return toHtml(hast);
};
