import { readdirSync, statSync } from "node:fs";
import path from "node:path";

function listFolders(directory: string) {
  try {
    // Get the list of files and folders in the directory
    const items = readdirSync(directory);

    // Filter out only the folders
    const folders = items.filter((item) => {
      const itemPath = path.join(directory, item);
      return statSync(itemPath).isDirectory();
    });

    return folders;
  } catch (error) {
    console.error(`Error while listing folders: ${error}`);
    return [];
  }
}

export const getDemos = (root: string) => {
  return listFolders(path.join(root, "demos"));
};
