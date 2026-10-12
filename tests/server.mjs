// Servidor HTTP estático simples para testar o site localmente.
// Uso: node tests/server.mjs [porta]   (padrão: 8080)
// Comporta-se como as hospedagens estáticas: "/pasta/" serve "/pasta/index.html",
// "/pasta" redireciona para "/pasta/" e endereços inexistentes recebem o 404.html.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.argv[2] || process.env.PORT || 8080);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon"
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function isDirectory(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

createServer(async (request, response) => {
  const url = new URL(request.url, "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const filePath = normalize(join(root, pathname));

  if (!filePath.startsWith(root) || pathname.split("/").includes("tests")) {
    response.writeHead(403).end("Acesso negado");
    return;
  }

  let target = filePath;
  if (await isDirectory(filePath)) {
    if (!pathname.endsWith("/")) {
      response.writeHead(301, { Location: pathname + "/" + url.search }).end();
      return;
    }
    target = join(filePath, "index.html");
  }

  let status = 200;
  if (!(await isFile(target))) {
    status = 404;
    target = join(root, "404.html");
  }

  const body = await readFile(target);
  response.writeHead(status, { "Content-Type": types[extname(target)] || "application/octet-stream" });
  response.end(body);
}).listen(port, () => {
  console.log(`Site disponível em http://localhost:${port}/`);
});
