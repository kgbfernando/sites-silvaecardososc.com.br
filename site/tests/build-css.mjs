// Junta e compacta os arquivos CSS do site em assets/css/site.min.css,
// o único arquivo de estilos carregado pelas páginas.
// Rode depois de editar qualquer CSS:  cd tests && npm run build:css
// Com --check, só confere se o arquivo gerado está atualizado (usado nos testes).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const cssDir = fileURLToPath(new URL("../assets/css/", import.meta.url));
const files = ["variables.css", "base.css", "layout.css", "components.css", "responsive.css"];

const minify = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

const output = files.map((file) => minify(readFileSync(cssDir + file, "utf8"))).join("") + "\n";

if (process.argv.includes("--check")) {
  if (readFileSync(cssDir + "site.min.css", "utf8") !== output) {
    console.error("assets/css/site.min.css está desatualizado. Rode: cd tests && npm run build:css");
    process.exit(1);
  }
} else {
  writeFileSync(cssDir + "site.min.css", output);
  console.log(`assets/css/site.min.css gerado (${(output.length / 1024).toFixed(1)} KB)`);
}
