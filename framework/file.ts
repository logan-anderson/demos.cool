import fs from "fs/promises";
import path from "path";

type FileType = "typescript" | "html" | "markdown";
type File = ConstantFiles & {
  path: string;
} & (
    | {
        exists: true;
        content: string;
      }
    | {
        exists: false;
      }
  );
type ConstantFiles = {
  name: string;
  type: FileType;
};

export const FILES: ConstantFiles[] = [
  {
    name: "page.html",
    type: "html",
  },
  {
    name: "page.md",
    type: "markdown",
  },
  {
    name: "entry-client.tsx",
    type: "typescript",
  },
  {
    name: "entry-server.tsx",
    type: "typescript",
  },
];

export const fileExists = async (path: string) => {
  try {
    await fs.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};
export const getFiles = async (folder: string) => {
  const files = await Promise.all<File>(
    FILES.map(async (file) => {
      const p = path.join(folder, file.name);
      const exists = await fileExists(p);
      if (!exists) {
        return {
          ...file,
          exists: false,
          path: p,
        };
      }
      const content = await fs.readFile(p, "utf-8");
      return {
        ...file,
        exists: true,
        path: p,
        content,
      };
    })
  );
  return files;
};
