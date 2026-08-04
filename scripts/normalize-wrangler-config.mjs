import { readFile, writeFile } from "node:fs/promises";

const configPath = new URL("../dist/server/wrangler.json", import.meta.url);
const config = JSON.parse(await readFile(configPath, "utf8"));

// Cloudflare now supplies the runtime compatibility behavior by default and
// rejects the legacy compatibility field during Sites publishing.
delete config.compatibility_flags;

await writeFile(configPath, JSON.stringify(config));
