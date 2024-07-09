import { visit } from "unist-util-visit";
import { unified } from "unified";

import type { Element } from "hast";
import rehypeParse from "rehype-parse";
import { ServerFrameworkContext } from "./frameworkContext";

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

  return (tree: Element) => {
    visit(tree, "element", (node) => {
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
  const savedProps = new ServerFrameworkContext().getInstance().getProps();
  const els: Element[] = [];
  if (Object.keys(savedProps).length > 0) {
    els.push({
      tagName: "script",
      type: "element",
      properties: {
        type: "application/json",
      },
      children: [
        {
          type: "text",
          value: JSON.stringify(savedProps),
        },
      ],
    });
  }
  const innerElArr = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .parse(innerHtml)
    .children.filter((x) => x.type === "element");

  return (tree: Element) => {
    visit(tree, "element", (node) => {
      if (els.length > 0 && !injectScript) {
        console.warn(
          "Props were not injected because injectScript was not provided"
        );
      }
      if (node.tagName === "body" && injectScript) {
        if (els.length > 0) {
          node.children.push(...els);
        }
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
