/*
 * Comportamentos gerais:
 *  - animação de entrada dos elementos com o atributo data-reveal;
 *  - paginação da lista de artigos (4 por página, como no site original);
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

  /* ---------- Paginação da lista de artigos ---------- */

  function initPagination() {
    var list = document.querySelector("[data-paginate]");
    var pagination = document.querySelector(".pagination");
    if (!list || !pagination) return;

    var items = Array.prototype.slice.call(list.children);
    var perPage = Number(list.dataset.paginate) || 4;
    var totalPages = Math.ceil(items.length / perPage);
    if (totalPages < 2) return;

    var prevButton = pagination.querySelector("[data-page-prev]");
    var nextButton = pagination.querySelector("[data-page-next]");
    var pageButtons = [];
    var currentPage = 1;

    for (var page = 1; page <= totalPages; page++) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "pagination__button";
      button.textContent = String(page);
      button.setAttribute("aria-label", "Página " + page);
      button.dataset.page = String(page);
      nextButton.before(button);
      pageButtons.push(button);
    }

    function showPage(pageNumber, moveFocus) {
      currentPage = pageNumber;
      items.forEach(function (item, index) {
        item.hidden = Math.floor(index / perPage) + 1 !== pageNumber;
      });
      pageButtons.forEach(function (button) {
        if (Number(button.dataset.page) === pageNumber) {
          button.setAttribute("aria-current", "page");
        } else {
          button.removeAttribute("aria-current");
        }
      });
      prevButton.disabled = pageNumber === 1;
      nextButton.disabled = pageNumber === totalPages;
      if (moveFocus) {
        list.scrollIntoView({ block: "start" });
        items[(pageNumber - 1) * perPage].querySelector("a").focus({ preventScroll: true });
      }
    }

    pagination.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button || button.disabled) return;
      if (button.hasAttribute("data-page-prev")) showPage(currentPage - 1, true);
      else if (button.hasAttribute("data-page-next")) showPage(currentPage + 1, true);
      else showPage(Number(button.dataset.page), true);
    });

    pagination.hidden = false;
    showPage(1, false);
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
  initPagination();
  fixFileProtocolLinks();
})();
