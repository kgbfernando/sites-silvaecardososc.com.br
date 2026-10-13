/*
 * Comportamentos gerais:
 *  - animação de entrada dos elementos com o atributo data-reveal;
 *  - links internos funcionando ao abrir os arquivos direto do disco (file://).
 */
(function () {
  "use strict";

  /* ---------- Animação ao rolar a página ---------- */

  function initReveal() {
    var elements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });

    // Rolagens muito rápidas (ou saltos por âncora) podem "pular" elementos
    // sem que o observador os detecte; ao parar de rolar, revela tudo o que
    // já está acima da parte de baixo da tela.
    var scrollTimer;
    window.addEventListener(
      "scroll",
      function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          elements.forEach(function (element) {
            if (!element.classList.contains("is-visible") && element.getBoundingClientRect().top < window.innerHeight) {
              element.classList.add("is-visible");
              observer.unobserve(element);
            }
          });
        }, 150);
      },
      { passive: true }
    );
  }

  /* ---------- Links internos ao abrir pelo explorador de arquivos ---------- */

  function fixFileProtocolLinks() {
    if (window.location.protocol !== "file:") return;
    document.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (/^[a-z]+:/i.test(href) || href.charAt(0) === "#") return;
      var url = new URL(href, window.location.href);
      if (url.protocol === "file:" && url.pathname.endsWith("/")) {
        url.pathname += "index.html";
        link.href = url.href;
      }
    });
  }

  initReveal();
  fixFileProtocolLinks();
})();
