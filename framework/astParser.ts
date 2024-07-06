import { unified } from "unified";
import { fromHtml } from "hast-util-from-html";
import { visit } from "unist-util-visit";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import type { Element } from "hast";

type Options = {
  outerHtml: string;
  innerHtml: string;
  injectScript?:
    | {
        path: string;
      }
    | false;
};

const customParser = ({ injectScript, innerHtml }: Options) => {
  const innerElArr = fromHtml(innerHtml).children.filter(
    (x) => x.type === "element"
  );
  if (innerElArr === undefined || innerElArr.length === 0) {
    throw new Error("inner element not found");
  }
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

export const getProcessor = (options: Options) => {
  return unified()
    .use(rehypeParse)
    .use(customParser, options)
    .use(rehypeStringify);
};

export const insertIntoIdRoot = (options: Options) => {
  const { outerHtml } = options;
  const output = getProcessor(options).processSync(outerHtml);
  return String(output);
};
