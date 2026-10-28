import { execFileSync } from "node:child_process";
import { expect, test } from "@playwright/test";

// Todas as páginas do site. Ao criar uma página nova, adicione-a aqui.
const PAGES = [
  "/",
  "/direito-do-trabalho/",
  "/direito-de-familia/",
  "/acidente-de-trabalho/",
  "/estabilidade/",
  "/horas-extras/",
  "/insalubridade/",
  "/justa-causa/",
  "/periculosidade/",
  "/rescisao-indireta/"
];

// Serviços externos do Google (mapa e fontes); erros deles não são do site.
const isThirdParty = (text) => /google|gstatic/i.test(text);

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
  });
}

for (const path of PAGES) {
  test.describe(`página ${path}`, () => {
    test("carrega sem erros de JavaScript nem recursos faltando", async ({ page, baseURL }) => {
      const problems = [];
      page.on("pageerror", (error) => problems.push(`Erro JS: ${error.message}`));
      page.on("console", (message) => {
        if (message.type() === "error" && !isThirdParty(message.text())) problems.push(`Console: ${message.text()}`);
      });
      page.on("response", (response) => {
        if (response.url().startsWith(baseURL) && response.status() >= 400) {
          problems.push(`HTTP ${response.status()}: ${response.url()}`);
        }
      });

      const response = await page.goto(path, { waitUntil: "networkidle" });
      expect(response.status()).toBe(200);
      await scrollThrough(page);
      expect(problems).toEqual([]);
    });

    test("tem título, descrição, canonical e um único H1", async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/Silva & Cardoso/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/silvaecardososc\.com\.br\//);
      await expect(page.locator("h1")).toHaveCount(1);
    });

    test("todas as imagens carregam e possuem atributo alt", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      const broken = await page.evaluate(async () => {
        const images = [...document.images].filter((img) => img.src.startsWith(location.origin));
        // Força o carregamento das imagens com loading="lazy" antes de verificar
        await Promise.all(
          images.map((img) => {
            img.loading = "eager";
            return img.decode().catch(() => {});
          })
        );
        return images.filter((img) => img.naturalWidth === 0 || !img.hasAttribute("alt")).map((img) => img.src);
      });
      expect(broken).toEqual([]);
    });

    test("não tem rolagem horizontal", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("links internos apontam para páginas existentes", async ({ page, request }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("site-footer footer");
      const links = await page.evaluate(() =>
        [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.href))].filter((href) =>
          href.startsWith(location.origin)
        )
      );
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        const url = new URL(link);
        const result = await request.get(url.pathname);
        expect(result.status(), link).toBe(200);
        if (url.hash) {
          const html = await result.text();
          expect(html, `âncora ${url.hash} em ${url.pathname}`).toContain(`id="${url.hash.slice(1)}"`);
        }
      }
    });
  });
}

test("formulário de contato valida campos e abre o WhatsApp com a mensagem", async ({ page, context }) => {
  await page.goto("/");
  const form = page.locator(".contact form");
  await form.locator('button[type="submit"]').click();
  await expect(page.locator("#contato-email-erro")).toHaveText("Email é obrigatório aqui");
  await expect(page.locator("#contato-mensagem-erro")).toHaveText("Mensagem é obrigatória aqui");

  await page.fill("#contato-email", "email-invalido");
  await form.locator('button[type="submit"]').click();
  await expect(page.locator("#contato-email-erro")).toHaveText("Insira um endereço de e-mail válido");

  // Impede que o teste acesse o WhatsApp de verdade
  await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, body: "ok" }));
  await page.fill("#contato-nome", "Maria Teste");
  await page.fill("#contato-email", "maria@exemplo.com");
  await page.fill("#contato-mensagem", "Gostaria de agendar uma consulta.");
  const [popup] = await Promise.all([page.waitForEvent("popup"), form.locator('button[type="submit"]').click()]);
  const popupUrl = decodeURIComponent(popup.url());
  const whatsappNumber = await page.evaluate(() => window.SITE_CONFIG.whatsappNumber);
  expect(popupUrl).toContain(`wa.me/${whatsappNumber}`);
  expect(popupUrl).toContain("Maria Teste");
  expect(popupUrl).toContain("maria@exemplo.com");
  await expect(form.locator(".form__status")).toContainText("WhatsApp");
});

test("endereço inexistente mostra a página 404", async ({ page }) => {
  const response = await page.goto("/pagina-que-nao-existe/");
  expect(response.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Página não encontrada.");
});

test("assets/css/site.min.css está atualizado com os arquivos CSS", () => {
  execFileSync("node", [new URL("./build-css.mjs", import.meta.url).pathname, "--check"], { stdio: "pipe" });
});
