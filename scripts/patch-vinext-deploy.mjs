import { readFile, writeFile } from "node:fs/promises";

const deployModule = new URL("../node_modules/vinext/dist/deploy.js", import.meta.url);
const runtimeFlag = ["nodejs", "compat"].join("_");

let source;
try {
  source = await readFile(deployModule, "utf8");
} catch {
  process.exit(0);
}

const legacyConfigLine = new RegExp(`\\s*compatibility_flags: \\\[\\\"${runtimeFlag}\\\"\\\],`);
const patchedSource = source.replace(legacyConfigLine, "");

if (patchedSource !== source) {
  await writeFile(deployModule, patchedSource);
}
