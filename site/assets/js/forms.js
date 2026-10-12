/*
 * Formulários de contato.
 *
 * O site original enviava os formulários para o servidor do Hostinger Website
 * Builder, que não existe em uma hospedagem estática. Por isso:
 *  - se SITE_CONFIG.formEndpoint (ou o atributo data-endpoint do formulário)
 *    estiver preenchido, os dados são enviados para esse endereço;
 *  - caso contrário, a mensagem é aberta no WhatsApp do escritório, para que a
 *    pessoa conclua o envio por lá. Nenhum envio é simulado.
 */
(function () {
  "use strict";

  var config = window.SITE_CONFIG;
  var links = window.SiteLinks;

  var MESSAGES = {
    required: "Este campo é obrigatório",
    email: "Insira um endereço de e-mail válido",
    whatsappOpened: "Abrimos o WhatsApp em uma nova aba com a sua mensagem. Para concluir o contato, envie a mensagem por lá.",
    popupBlocked: "Não foi possível abrir o WhatsApp automaticamente.",
    sent: "Mensagem enviada com sucesso",
    sendError: "Não foi possível enviar a mensagem agora. Tente novamente ou fale conosco pelo WhatsApp."
  };

  function errorElementFor(input) {
    var id = input.getAttribute("aria-describedby");
    return id ? document.getElementById(id) : null;
  }

  function validateField(input) {
    var message = "";
    var value = input.value.trim();

    if (input.required && value === "") {
      message = input.dataset.requiredMessage || MESSAGES.required;
    } else if (input.type === "email" && value !== "" && !input.validity.valid) {
      message = MESSAGES.email;
    }

    var errorElement = errorElementFor(input);
    if (errorElement) errorElement.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return message === "";
  }

  function buildWhatsappText(form) {
    var data = new FormData(form);
    var lines = [config.whatsappDefaultMessage, ""];
    if (data.get("name")) lines.push("Nome: " + data.get("name").trim());
    if (data.get("email")) lines.push("E-mail: " + data.get("email").trim());
    if (data.get("message")) lines.push("Mensagem: " + data.get("message").trim());
    return lines.join("\n");
  }

  function showStatus(form, text, linkUrl) {
    var status = form.querySelector(".form__status");
    if (!status) return;
    status.textContent = text;
    if (linkUrl) {
      var link = document.createElement("a");
      link.href = linkUrl;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = " Abrir o WhatsApp";
      status.appendChild(link);
    }
  }

  function sendToEndpoint(form, endpoint) {
    var button = form.querySelector('[type="submit"]');
    button.disabled = true;

    fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        form.reset();
        showStatus(form, MESSAGES.sent);
      })
      .catch(function () {
        showStatus(form, MESSAGES.sendError, links.whatsappUrl(buildWhatsappText(form)));
      })
      .finally(function () {
        button.disabled = false;
      });
  }

  function openWhatsapp(form) {
    var url = links.whatsappUrl(buildWhatsappText(form));
    // Sem "noopener" nos parâmetros, pois ele faz window.open retornar null
    // e impediria detectar o bloqueio de pop-ups.
    var opened = window.open(url, "_blank");
    if (opened) {
      opened.opener = null;
      showStatus(form, MESSAGES.whatsappOpened);
    } else {
      showStatus(form, MESSAGES.popupBlocked, url);
    }
  }

  document.querySelectorAll("form[data-contact-form]").forEach(function (form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll(".form__input"));

    fields.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value.trim() !== "") validateField(input);
      });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validateField(input);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var invalidFields = fields.filter(function (input) {
        return !validateField(input);
      });
      if (invalidFields.length > 0) {
        invalidFields[0].focus();
        return;
      }

      var endpoint = form.dataset.endpoint || config.formEndpoint;
      if (endpoint) {
        sendToEndpoint(form, endpoint);
      } else {
        openWhatsapp(form);
      }
    });
  });
})();
