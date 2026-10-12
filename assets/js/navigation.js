/*
 * Menu móvel do cabeçalho das páginas de artigos.
 * - Botão com aria-expanded indica se o menu está aberto.
 * - A tecla Esc fecha o menu e devolve o foco ao botão.
 * - Ao voltar para a largura de computador, o menu é reiniciado.
 */
(function () {
  "use strict";

  var toggle = document.querySelector(".site-header__toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  var label = toggle.querySelector(".visually-hidden");
  var desktopQuery = window.matchMedia("(min-width: 921px)");

  function setOpen(isOpen) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    nav.classList.toggle("is-open", isOpen);
    label.textContent = isOpen ? "Fechar menu" : "Abrir menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Fecha o menu ao escolher um link (inclusive âncoras na mesma página)
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  desktopQuery.addEventListener("change", function () {
    setOpen(false);
  });
})();
