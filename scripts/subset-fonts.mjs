import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const publicDir = path.join(root, "public");
const fontDir = path.join(publicDir, "assets", "fonts");
const chars = new Set();

async function collect(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(filename);
    else if (entry.name.endsWith(".html")) {
      for (const char of await fs.readFile(filename, "utf8")) chars.add(char);
    }
  }
}

await collect(publicDir);
await fs.mkdir(fontDir, { recursive: true });
const textFile = path.join(fontDir, ".subset-chars.txt");
await fs.writeFile(textFile, [...chars].sort().join(""));
try {
  const result = spawnSync(process.env.PYTHON || "python", [
    "-m", "fontTools.subset", path.join(root, "fonts", "HuiwenMincho.ttf"),
    `--text-file=${textFile}`, "--flavor=woff2",
    `--output-file=${path.join(fontDir, "huiwen.woff2")}`,
    "--layout-features=*", "--no-hinting", "--desubroutinize",
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error("Font subsetting failed; install fonttools and brotli.");
  const { size } = await fs.stat(path.join(fontDir, "huiwen.woff2"));
  console.log(`HuiWen: ${chars.size} characters, ${Math.round(size / 1024)} KiB`);
} finally {
  await fs.rm(textFile, { force: true });
}
