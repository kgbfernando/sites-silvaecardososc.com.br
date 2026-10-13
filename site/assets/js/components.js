/*
 * Componentes compartilhados entre as páginas.
 *
 * Para não repetir o mesmo HTML em todas as páginas, o rodapé e o botão
 * flutuante do WhatsApp são definidos aqui uma única vez e inseridos pelas tags:
 *
 *   <site-footer></site-footer>
 *   <whatsapp-button></whatsapp-button>
 *
 * Os caminhos são calculados a partir da localização deste arquivo, então
 * funcionam em qualquer página, em qualquer nível de pasta.
 */
(function () {
  "use strict";

  var config = window.SITE_CONFIG;
  var scriptUrl = document.currentScript.src;
  var rootUrl = new URL("../../", scriptUrl);
  var isFileProtocol = rootUrl.protocol === "file:";

  // Endereço de uma página do site. Ao abrir pelo explorador de arquivos
  // (file://), aponta diretamente para o index.html da pasta.
  function pageUrl(path) {
    var url = new URL(path || "", rootUrl);
    if (isFileProtocol && url.pathname.endsWith("/")) {
      url.pathname += "index.html";
    }
    return url.href;
  }

  function assetUrl(path) {
    return new URL("assets/" + path, rootUrl).href;
  }

  function whatsappUrl(message) {
    return "https://wa.me/" + config.whatsappNumber + "?text=" + encodeURIComponent(message || config.whatsappDefaultMessage);
  }

  window.SiteLinks = { pageUrl: pageUrl, assetUrl: assetUrl, whatsappUrl: whatsappUrl };

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      var socialItems = config.socialLinks
        .map(function (link) {
          return (
            '<li><a class="social-links__link" href="' + link.url + '" target="_blank" rel="noopener">' +
            '<img src="' + assetUrl("icons/" + link.icon) + '" width="17" height="17" alt="' + link.name + '">' +
            "</a></li>"
          );
        })
        .join("");

      this.innerHTML =
        '<footer class="site-footer section section--image section--bg-predios">' +
        '  <div class="container">' +
        '    <form class="form form--dark site-footer__form" data-contact-form data-form-name="Consulta pelo rodapé" novalidate>' +
        '      <div class="form__field">' +
        '        <label class="form__label" for="footer-email">Seu e-mail para contato</label>' +
        '        <input class="form__input" id="footer-email" name="email" type="email" autocomplete="email" placeholder="Digite seu e-mail aqui" required data-required-message="E-mail é obrigatório aqui" aria-describedby="footer-email-error">' +
        '        <p class="form__error" id="footer-email-error" aria-live="polite"></p>' +
        "      </div>" +
        '      <div class="form__actions">' +
        '        <button class="btn btn--submit" type="submit">Enviar consulta jurídica agora</button>' +
        "      </div>" +
        '      <p class="form__note">O envio abre o WhatsApp do escritório com a sua mensagem.</p>' +
        '      <p class="form__status" role="status"></p>' +
        "    </form>" +
        '    <img class="site-footer__logo" src="' + assetUrl("images/logo-silva-e-cardoso-advogados.png") + '" width="1259" height="184" alt="Silva e Cardoso Advogados e Associados" loading="lazy">' +
        '    <div class="site-footer__bottom">' +
        '      <ul class="social-links" aria-label="Redes sociais">' + socialItems + "</ul>" +
        '      <p class="site-footer__copyright">' + config.copyright + "</p>" +
        "    </div>" +
        "  </div>" +
        "</footer>";
    }
  }

  class WhatsappButton extends HTMLElement {
    connectedCallback() {
      this.innerHTML =
        '<a class="whatsapp-float" href="' + whatsappUrl() + '" target="_blank" rel="noopener">' +
        '  <img src="' + assetUrl("icons/whatsapp.svg") + '" width="64" height="64" alt="Falar pelo WhatsApp">' +
        "</a>";
    }
  }

  customElements.define("site-footer", SiteFooter);
  customElements.define("whatsapp-button", WhatsappButton);
})();
