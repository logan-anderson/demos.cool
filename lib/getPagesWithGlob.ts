import { glob } from "glob";
import { PAGES_FOLDER } from "../framework/constants";
import { FILES } from "../framework/file";
import path from "path";

export const getPagesWithGlob = (args?: { subFolder?: string }) => {
  const { subFolder } = args || {};
  const globPattern = `${PAGES_FOLDER}${subFolder || ""}/**/*{${FILES.map(
    (x) => x.name
  ).join(",")}}`;
  const paths = glob.sync(globPattern).map(path.dirname);
  return paths;
};
