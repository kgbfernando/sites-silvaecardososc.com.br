# Mapa do site — original × versão estática

Levantamento feito em 12/10/2026 a partir do sitemap, dos menus, do rodapé e dos links internos de todas as páginas do site de referência (chamado de "original" neste documento). O original é gerado pelo **Hostinger Website Builder** (Zyro, renderizado com Astro), não pelo WordPress. Os textos, as posições dos elementos e as configurações foram extraídos dos dados que o próprio site entrega a cada página.

Foram encontradas **15 páginas públicas**. Nenhuma página extra apareceu nos links internos além das listadas no sitemap.

## Páginas

| # | URL original | Arquivo local | Endereço publicado |
| --- | --- | --- | --- |
| 1 | `/` | `index.html` | `/` |
| 2 | `/direito-do-trabalho` | `direito-do-trabalho/index.html` | `/direito-do-trabalho/` |
| 3 | `/acidente-de-trabalho` | `acidente-de-trabalho/index.html` | `/acidente-de-trabalho/` |
| 4 | `/estabilidade` | `estabilidade/index.html` | `/estabilidade/` |
| 5 | `/horas-extras` | `horas-extras/index.html` | `/horas-extras/` |
| 6 | `/insalubridade` | `insalubridade/index.html` | `/insalubridade/` |
| 7 | `/justa-causa` | `justa-causa/index.html` | `/justa-causa/` |
| 8 | `/periculosidade` | `periculosidade/index.html` | `/periculosidade/` |
| 9 | `/rescisao-indireta` | `rescisao-indireta/index.html` | `/rescisao-indireta/` |
| 10 | `/artigos-juridicos` | — (removida) | — |
| 11 | `/rescisao-indireta-direitos-do-trabalhador` | — (removida) | — |
| 12 | `/auxilio-acidente-o-que-e-quem-tem-direito-e-como-garantir-esse-beneficio-do-inss` | — (removida) | — |
| 13 | `/mudancas-significativas-na-forma-como-as-demandas-judiciais-sobre-fornecimento-de-medicamentos-nao-incorporados-ao-sus-serao-processadas` | — (removida) | — |
| 14 | `/plantao-por-celular-da-direito-a-horas-de-sobreaviso-entenda-seus-direitos-trabalhistas` | — (removida) | — |
| 15 | `/stf-suspende-processos-sobre-pejotizacao-entenda-os-impactos-da-decisao` | — (removida) | — |
| — | (não existia) | `404.html` | exibida em endereços inexistentes |

**Artigos removidos:** a lista de artigos e os 5 artigos (linhas 10 a 15) eram do escritório anterior e foram removidos em 13/10/2026, junto com o cabeçalho preto com menu que só existia nessas páginas. Se esses endereços estiverem indexados no Google, eles passam a mostrar a página 404; se quiser, configure redirecionamentos 301 para a página inicial na hospedagem (por exemplo, um arquivo `_redirects` no Cloudflare Pages ou `Redirect 301` no `.htaccess`).

**Endereços:** a versão estática usa a barra no final (`/horas-extras/`). Apache, Nginx (`try_files $uri $uri/`), Cloudflare Pages e S3 redirecionam automaticamente `/horas-extras` para `/horas-extras/`, então links antigos e resultados do Google continuam funcionando. O `canonical` e o `sitemap.xml` já usam o formato novo.

## Integrações externas mantidas

| Integração | Situação |
| --- | --- |
| WhatsApp (`wa.me/5547999098173`) com as mensagens originais de cada botão | mantido, com o número do escritório |
| Widget de avaliações do Google (Elfsight) | removido em 13/10/2026; substituído por avaliações fixas (veja abaixo) |
| Google Maps (botão "Tenha acesso a localização…") | R. Amapá, 135 – Cordeiros, Itajaí – SC |
| Redes sociais do rodapé | mantidas como no original (veja as limitações) |

## Limitações e diferenças em relação ao original

**Formulários**
- Os três formulários do original ("Contato Rápido" nas páginas de área e na inicial e "Seu e-mail para contato" no rodapé) enviavam os dados ao servidor do Hostinger, usando chaves internas da plataforma. Isso não funciona fora do Hostinger, e essas chaves não foram copiadas.
- **Alternativa adotada:** o formulário valida os campos e abre o WhatsApp do escritório com nome, e-mail e mensagem preenchidos. Foi adicionada uma frase curta avisando isso abaixo do botão. Para envio por e-mail, veja a seção "Formulários" do README.
- A mensagem de validação em inglês do original ("Please enter a valid email address") foi traduzida para "Insira um endereço de e-mail válido". As demais mensagens foram mantidas.

**Links que não existiam no original**
- Nos botões "Direito de Trânsito", "Família e Sucessões", "Direito Penal", "Direito Médico", "Direito Previdenciário", "Direito Imobiliário" e "Assessoria Jurídica" (página inicial), e na maioria dos itens das listas das páginas de área, o original não tinha link nem página. Eles foram mantidos com a mesma aparência, sem link.

**Redes sociais (rodapé)**
- Instagram (`@silvaecardoso_advogados`), Facebook, TikTok (`@silvaecardosoadv`) e X (`@scadvogadoass`) apontam para os perfis do escritório; ajuste em `assets/js/config.js`.
- Os links "Áreas de atuação" e "Avaliações" do rodapé foram removidos em 13/10/2026.

**Visual e conteúdo**
- Fontes: são usados os mesmos arquivos Roboto e Montserrat servidos pelo original, agora hospedados em `assets/fonts/`.
- Tamanhos de fonte muito pequenos no celular (10 px nos botões e textos de "Nossos Serviços Online") foram aumentados para 12 px, por legibilidade.
- Um caractere de aspas (`"`) solto sobre a foto do edifício, na seção "Conheça nosso escritório", foi omitido. Parece ser um resto do modelo, quase invisível.
- A hierarquia de títulos foi corrigida para SEO e acessibilidade, sem mudar o texto: um único H1 por página (o logotipo na inicial, a pergunta do banner nas páginas de área, o título nos artigos), H2 para seções e H3 para itens. No original os títulos usavam níveis aleatórios (H1 no meio da página, subtítulos de artigos em H5).
- Os textos alternativos (`alt`) das imagens estavam vazios no original. Foram escritas descrições objetivas para as fotos (nomes dos advogados, sala de espera, fachada do edifício). As imagens decorativas e as capas dos artigos ficaram com `alt=""`.
- As animações de entrada (deslizar e aumentar com esmaecimento, 0,65 s) foram reproduzidas. Elas são desativadas para quem configurou o sistema para reduzir movimento.
- A imagem de fundo fixa (efeito parallax) das seções da equipe é desativada em telas de toque, onde o navegador não a suporta bem.

**SEO**
- As 8 páginas de área têm, no original, o mesmo título e a mesma descrição ("Direito do Trabalho - Silva e Cardoso Advogados e Associados"). Isso foi preservado para não inventar conteúdo, mas vale escrever um título e uma descrição próprios para cada uma.
- O Google Tag Manager do original não foi incluído; veja o README.
- A imagem de compartilhamento (`og:image`) passou a ser servida pelo próprio site (`assets/images/og-image.jpg`).

**Recursos não recuperados:** nenhum. Todas as imagens e as fontes foram baixadas do CDN do original, convertidas para WebP quando aplicável e redimensionadas sem perda visível.

## Identidade visual (Silva e Cardoso Advogados e Associados)

- Logotipo: o banner e o cabeçalho usam o emblema oficial (`assets/images/logo-emblema.webp`, extraído de `novas/logo.jpeg`, com o fundo branco removido por máscara circular suavizada e o dourado levemente dessaturado para combinar com o site) ao lado do nome em texto (`logo-silva-e-cardoso-advogados.png`). O nome em texto, a imagem de compartilhamento (`og-image.jpg`) e os favicons (`assets/icons/`) ainda são **provisórios** (texto em Montserrat).
- Avaliações: o widget da Elfsight (que mostrava o perfil do escritório anterior) foi trocado por 5 avaliações fixas, copiadas em 13/10/2026 do perfil "Silva & Cardoso Advogados e Associados" no Google Maps (nota 5,0). O Google, sem login, só mostra 5 avaliações com texto; as demais podem ser acrescentadas à mão. O bloco está repetido nas 9 páginas (inicial e de área): ao atualizar a nota ou os textos, altere todas.
- O botão de localização aponta para R. Amapá, 135 – Cordeiros, Itajaí – SC, 88310-500, no Google Maps.
- Equipe: **Leandro Francisco da Silva** (`equipe-leandro-francisco-da-silva.webp`) e **Matheus Cardoso Delfino** (`equipe-matheus-cardoso-delfino.webp`), com formação e OAB atualizadas nas 9 páginas (inicial e de área). As fotos tiveram cor e brilho equalizados e ganharam moldura deslocada.
- A página `/artigos-juridicos/`, os 5 artigos e os links "Nossos artigos" (cabeçalho) e "Artigos" (rodapé) foram removidos em 13/10/2026. O texto de direitos autorais do rodapé passou a ser "© 2026 Silva & Cardoso Advogados e Associados. Todos os direitos reservados."
- Fundos das seções (`bg-predios`, `bg-biblioteca`, `bg-balanca`) e a foto do "Contato Rápido" (`escritorio-fachada-noite.webp`) foram trocados em 13/10/2026 por fotos semelhantes em domínio público (CC0, rawpixel). Os botões "Falar com Advogado Especialista" passaram a usar o verde escuro do botão flutuante do WhatsApp (`--color-whatsapp-dark`, #008361).
- WhatsApp atualizado para (47) 99909-8173 em todos os botões e no `config.js`.
- Seção "Nossos Serviços Online": a foto foi trocada por `assets/images/escritorio-interno.webp` (sala de atendimento), com a mesma moldura deslocada das fotos da equipe, em tom escuro. A área da foto passou de 506×360 para 506×420 no desktop, para encaixar melhor uma foto vertical.
- Seção "Conheça nosso escritório": a foto foi trocada pela fachada do escritório (`assets/images/escritorio-fachada.webp`), com a mesma moldura escura, enquadrada na placa com o nome do escritório.
