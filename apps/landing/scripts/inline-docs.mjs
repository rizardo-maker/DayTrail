import { readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(scriptDir, "../../../docs");
const indexPath = resolve(docsDir, "index.html");

let html = await readFile(indexPath, "utf8");

const stylesheetMatch = html.match(
  /<link rel="stylesheet" crossorigin href="(?<href>\.\/assets\/[^"]+\.css)">/,
);
const scriptMatch = html.match(
  /<script type="module" crossorigin src="(?<src>\.\/assets\/[^"]+\.js)"><\/script>/,
);

if (!stylesheetMatch?.groups?.href || !scriptMatch?.groups?.src) {
  throw new Error("Could not find Vite stylesheet and script tags in docs/index.html");
}

const stylesheetPath = resolve(docsDir, stylesheetMatch.groups.href);
const scriptPath = resolve(docsDir, scriptMatch.groups.src);
const css = await readFile(stylesheetPath, "utf8");
let js = await readFile(scriptPath, "utf8");

js = js.replace(/import\("\.\/([^"]+\.js)"\)/g, 'import("./assets/$1")');

html = html
  .replace(scriptMatch[0], () => `<script type="module">\n${js}\n</script>`)
  .replace(stylesheetMatch[0], () => `<style>\n${css}\n</style>`);

await writeFile(indexPath, html);
await unlink(stylesheetPath);
await unlink(scriptPath);

console.log("Inlined landing CSS and entry JavaScript into docs/index.html");
