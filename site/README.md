# Silva e Cardoso Advogados e Associados — site estático

Site de <https://silvaecardososc.com.br/>, reconstruído a partir de um site de referência feito no Hostinger Website Builder, usando apenas **HTML5, CSS3 e JavaScript puro**. Não há framework, backend, banco de dados nem etapa de compilação: os arquivos desta pasta são exatamente o que vai para a hospedagem.

A lista de páginas originais, a página local correspondente a cada uma e as limitações conhecidas estão em [SITE-MAP.md](SITE-MAP.md).

---

## 1. Estrutura dos diretórios

```
/
├── index.html                        ← página inicial
├── direito-do-trabalho/index.html    ← páginas de área (uma pasta por página)
├── acidente-de-trabalho/index.html
├── estabilidade/index.html
├── horas-extras/index.html
├── insalubridade/index.html
├── justa-causa/index.html
├── periculosidade/index.html
├── rescisao-indireta/index.html
├── 404.html                          ← página de "não encontrado"
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── variables.css   ← cores, fontes, larguras, bordas (comece por aqui)
│   │   ├── base.css        ← fontes locais, reset, estilos de elementos
│   │   ├── layout.css      ← contêiner, seções, imagens de fundo
│   │   ├── components.css  ← botões, banner, equipe, formulários, rodapé…
│   │   └── responsive.css  ← ajustes para tablet e celular
│   ├── js/
│   │   ├── config.js       ← WhatsApp, redes sociais, endereço de envio dos formulários
│   │   ├── components.js   ← rodapé e botão do WhatsApp compartilhados
│   │   ├── forms.js        ← validação e envio dos formulários
│   │   └── main.js         ← animações ao rolar
│   ├── images/             ← fotos, logotipo, fundos, imagem de compartilhamento
│   ├── icons/              ← favicons e ícones SVG (WhatsApp, redes sociais)
│   └── fonts/              ← Roboto e Montserrat (arquivos .woff2)
├── tests/                  ← testes automatizados (opcional, só para desenvolvimento)
├── README.md
└── SITE-MAP.md
```

### Por que uma pasta por página?

Cada página fica em `nome-da-pagina/index.html`. Assim os endereços continuam sem `.html`, iguais aos do site original (`/direito-do-trabalho/`), em **qualquer** hospedagem estática (Apache, Nginx, Cloudflare Pages, Amazon S3, GitHub Pages, hospedagens compartilhadas), sem configuração de reescrita de URL.

Os links entre páginas são relativos (`../horas-extras/`), então o site também funciona se for publicado em uma subpasta.

### Rodapé sem repetição

HTML puro não tem "include". Para não copiar o mesmo rodapé em todos os arquivos, duas partes comuns são definidas **uma única vez** em `assets/js/components.js` e inseridas pelas tags:

| Tag no HTML | O que aparece | Onde é usada |
| --- | --- | --- |
| `<site-footer></site-footer>` | rodapé completo | todas as páginas |
| `<whatsapp-button></whatsapp-button>` | botão flutuante do WhatsApp | todas as páginas |

Os caminhos são calculados a partir da localização do script, então funcionam em qualquer nível de pasta. O conteúdo principal de cada página (textos, títulos, imagens) continua escrito diretamente no HTML, como deve ser para SEO.

> As seções repetidas das páginas de área (equipe, serviços online, escritório, avaliações, contato e perguntas frequentes) estão no HTML de cada página, porque são conteúdo indexável. Para alterar um texto que aparece em várias páginas, use **Editar → Substituir nos arquivos** (`Ctrl+Shift+H`) no VS Code.

---

## 2. Como abrir e executar localmente

**Opção A — direto do disco:** dê dois cliques em `index.html`. A navegação funciona (os links são ajustados automaticamente para `index.html`), mas alguns navegadores bloqueiam recursos externos em `file://`. Por isso, prefira a opção B.

**Opção B — servidor local (recomendado)**, escolha um:

- **VS Code:** instale a extensão *Live Server* (Ritwick Dey), abra a pasta e clique em **Go Live** na barra inferior. As alterações aparecem ao salvar.
- **Python** (já vem no Linux/macOS):
  ```bash
  python3 -m http.server 8080
  ```
- **Node.js** (servidor incluído nos testes, simula a hospedagem com 404 e redirecionamentos):
  ```bash
  node tests/server.mjs 8080
  ```

Depois acesse <http://localhost:8080/>.

---

## 3. Como editar textos

Abra o arquivo `index.html` da página desejada e altere o texto entre as tags. Cada seção começa com um comentário que diz o que ela é, por exemplo:

```html
<!-- Perguntas frequentes -->
<section class="faq section section--white" ...>
  ...
  <h3 class="faq__question">Qual o horário de atendimento?</h3>
  <p class="faq__answer">Atendimento em geral das 9h às 18h ...</p>
```

- **Títulos da aba e do Google:** `<title>` e `<meta name="description">` no topo de cada arquivo. Os campos `og:` e `twitter:` controlam a prévia em redes sociais e no WhatsApp.
- **Textos do rodapé e do botão flutuante:** `assets/js/components.js`.
- **Número do WhatsApp, mensagem padrão, redes sociais e copyright:** `assets/js/config.js`.
- **Links de WhatsApp dentro das páginas** (botões verdes "Falar com Advogado Especialista"): estão no próprio HTML, porque cada página tem uma mensagem própria. Para trocar o número em todos, use `Ctrl+Shift+H` e substitua `5547999098173`.

---

## 4. Como substituir imagens e logotipo

1. Coloque o novo arquivo em `assets/images/` (formatos recomendados: `.webp` para fotos, `.png` para o logotipo com fundo transparente).
2. Para manter tudo funcionando sem editar código, use **o mesmo nome do arquivo antigo**. Se mudar o nome, atualize o `src="..."` no HTML.
3. Atualize os atributos `width` e `height` da tag `<img>` com as dimensões reais da imagem (evita que a página "pule" ao carregar).
4. Descreva a imagem no atributo `alt` (use `alt=""` apenas se for decorativa).

| O quê | Arquivo |
| --- | --- |
| Emblema circular (banner e cabeçalho) | `assets/images/logo-emblema.webp` (480×480, fundo transparente) |
| Nome em texto (banner, cabeçalho e rodapé) | `assets/images/logo-silva-e-cardoso-advogados.png` |
| Fundos escuros das seções | `assets/images/bg-predios.webp`, `bg-biblioteca.webp`, `bg-balanca.webp` (definidos em `assets/css/layout.css`); fotos em domínio público (CC0) do rawpixel |
| Fotos dos advogados | `assets/images/equipe-*.webp` |
| Imagem de compartilhamento (redes sociais) | `assets/images/og-image.jpg` (1440×756) |
| Favicon | `assets/icons/favicon-*.png` e `apple-touch-icon.png` |

Para otimizar imagens novas, use por exemplo <https://squoosh.app/> (WebP, qualidade ~80, largura máxima ~1920 px para fundos e ~1000 px para fotos).

---

## 5. Como alterar cores, fontes, larguras e espaçamentos

Quase tudo está centralizado em **`assets/css/variables.css`**:

```css
--color-whatsapp: #25d366;     /* verde dos botões */
--color-brown: #382e27;        /* botão de envio dos formulários */
--font-primary: "Roboto", ...; /* fonte principal */
--font-accent: "Montserrat", ...;
--content-width: 1224px;       /* largura máxima do conteúdo */
--font-size-section-title: 48px;
```

- **Espaçamentos de uma seção específica:** procure a seção em `assets/css/components.css` (ex.: `.faq { padding: 120px 0 56px; }`).
- **Celular e tablet:** `assets/css/responsive.css` (ponto de quebra principal: 920 px, o mesmo do site original).
- **Trocar a fonte:** coloque os arquivos `.woff2` em `assets/fonts/`, declare-os com `@font-face` no início de `assets/css/base.css` e altere `--font-primary` em `variables.css`.
- **Escurecimento dos fundos:** variável `--overlay-opacity` de cada seção em `components.css` (0 = sem película, 1 = totalmente escuro).

---

## 6. Como adicionar uma nova página

1. Copie a pasta de uma página parecida (por exemplo `horas-extras/` para uma nova página de área) e dê a ela o nome do endereço desejado, em letras minúsculas e com hífens: `direito-de-transito/`.
2. No novo `index.html`, altere `<title>`, `<meta name="description">`, `<link rel="canonical">`, as tags `og:`/`twitter:`, o bloco `application/ld+json` e o conteúdo.
3. Crie os links para ela nas outras páginas. Exemplo: na página inicial, troque o item sem link
   ```html
   <li data-reveal="scale"><span class="btn btn--dark btn--static">Direito de Trânsito</span></li>
   ```
   por
   ```html
   <li data-reveal="scale"><a class="btn btn--dark" href="direito-de-transito/">Direito de Trânsito</a></li>
   ```
4. Adicione o endereço em `sitemap.xml` e na lista `PAGES` de `tests/site.spec.mjs`.

Páginas novas na raiz usam caminhos que começam com `../` (`../assets/...`). Páginas em níveis mais profundos precisam de `../../`.

---

## 7. Como testar as alterações

**Manual:** abra o site com um servidor local (seção 2), navegue pelas páginas e use as ferramentas do navegador (`F12` → *Console*, para erros, e o modo de dispositivo `Ctrl+Shift+M`, para simular celulares).

**Automático (opcional, requer Node.js 18+):**

```bash
cd tests
npm install
npx playwright install chromium   # apenas na primeira vez
npm test
```

Os testes abrem todas as páginas em desktop e celular e verificam: erros de JavaScript, arquivos faltando (HTTP 404), título/descrição/canonical/H1, imagens quebradas e sem `alt`, rolagem horizontal indevida, links internos e âncoras, validação e envio do formulário de contato, e a página 404. O relatório detalhado fica disponível com `npm run test:report`.

A pasta `tests/` não precisa ser publicada (veja a seção 8).

---

## 8. Como publicar em uma hospedagem estática

Envie para a hospedagem **todo o conteúdo da pasta, exceto** `tests/`, `.git/`, `.gitignore`, `README.md` e `SITE-MAP.md` (estes podem ir sem problema, mas não são necessários).

- **Hospedagem tradicional (cPanel, Hostinger, Locaweb…):** envie os arquivos por FTP ou pelo gerenciador de arquivos para `public_html/`. Para usar a página 404, adicione um `.htaccess` com `ErrorDocument 404 /404.html`.
- **Nginx:**
  ```nginx
  server {
    root /var/www/silvaecardososc;
    index index.html;
    location / { try_files $uri $uri/ =404; }
    error_page 404 /404.html;
  }
  ```
- **Cloudflare Pages:** crie um projeto, conecte o repositório (ou faça upload da pasta), deixe o *build command* vazio e o *output directory* como `/`. O `404.html` é usado automaticamente.
- **Amazon S3:** ative *Static website hosting* no bucket, defina `index.html` como documento de índice e `404.html` como documento de erro, e envie os arquivos (`aws s3 sync . s3://NOME-DO-BUCKET --exclude "tests/*" --exclude ".git/*"`). Use o CloudFront para HTTPS e domínio próprio.

Antes de publicar no domínio definitivo:

- Os endereços absolutos (`canonical`, `og:image`, `sitemap.xml`, `robots.txt`) usam `https://silvaecardososc.com.br/`. Se o domínio for outro, substitua em todos os arquivos com `Ctrl+Shift+H`.
- A página `404.html` usa caminhos que começam com `/`, então o site precisa estar na raiz do domínio para ela aparecer com estilos.
- Configure o envio real dos formulários, se desejar (veja abaixo).

### Formulários

O site original enviava os formulários para o servidor do Hostinger Website Builder, que não existe em uma hospedagem estática. Na versão atual, ao enviar, o formulário **abre o WhatsApp do escritório com a mensagem já preenchida**, e a pessoa conclui o envio por lá. O site não informa um envio que não aconteceu.

Para receber os formulários por e-mail, crie um formulário em um serviço como [Formspree](https://formspree.io/), [Getform](https://getform.io/) ou [Web3Forms](https://web3forms.com/) e coloque o endereço fornecido em `formEndpoint`, no arquivo `assets/js/config.js`. Não coloque senhas nem chaves privadas nos arquivos do site: tudo nesta pasta fica público.

### Google Tag Manager / Analytics

O site não usa Google Tag Manager nem Google Analytics. Para medir visitas, crie um contêiner na conta Google do escritório e cole o código fornecido no `<head>` de cada página (e informe o uso de cookies, conforme a LGPD).
