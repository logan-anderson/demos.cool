import path from "node:path";
import fs from "node:fs/promises";

export async function renameBuildToIndex(directoryPath: string): Promise<void> {
  try {
    // Read the contents of the directory
    const files = await fs.readdir(directoryPath);

    // Iterate through each file/directory
    for (const file of files) {
      const filePath = path.join(directoryPath, file);

      // Get file stats
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        // Recursively call the function for subdirectories
        await renameBuildToIndex(filePath);
      } else if (file === "build.html") {
        // If it's a file named build.html, rename it to index.html
        const newIndexFilePath = path.join(directoryPath, "index.html");
        await fs.rename(filePath, newIndexFilePath);
        console.log(`Renamed: ${filePath} -> ${newIndexFilePath}`);
      }
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
