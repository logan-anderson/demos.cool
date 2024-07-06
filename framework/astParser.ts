import { visit } from "unist-util-visit";
import { unified } from "unified";

import type { Element } from "hast";
import rehypeParse from "rehype-parse";

type InjectScript =
  | {
      path: string;
    }
  | false;

export type OverwriteRootOptions =
  | {
      rootEl: string;
    }
  | false;
export const overwriteRootPlugin = (args: OverwriteRootOptions) => {
  if (!args) return () => {};
  const rootEl = args.rootEl;

  const els = unified()
    .use(rehypeParse, { fragment: true })
    .parse(rootEl).children;
  if (els.length !== 1) {
    throw new Error("Root element must have exactly one child");
  }
  const root = els[0].type === "element" ? els[0] : null;
  if (!root) {
    throw new Error("Root element must be an element");
  }

  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "div" && node.properties.id === "root") {
        node.properties = {
          ...node.properties,
          ...root.properties,
        };
        node.tagName = root.tagName;
      }
    });
  };
};

export type InjectPluginOptions = {
  injectScript?: InjectScript;
  innerHtml: string;
};

export const injectPlugin = ({
  injectScript,
  innerHtml,
}: {
  injectScript?: InjectScript;
  innerHtml: string;
}) => {
  const innerElArr = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .parse(innerHtml)
    .children.filter((x) => x.type === "element");

  return (tree) => {
    visit(tree, "element", (node: Element) => {
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
  };
};
