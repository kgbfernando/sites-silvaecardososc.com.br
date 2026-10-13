/*
 * Configurações gerais do site, usadas pelos componentes compartilhados
 * (cabeçalho, rodapé, botão do WhatsApp) e pelos formulários.
 * Altere aqui o número do WhatsApp, a mensagem padrão e as redes sociais.
 */
window.SITE_CONFIG = {
  siteName: "Silva & Cardoso Advogados e Associados",

  // Número no formato internacional, somente dígitos (55 + DDD + número)
  whatsappNumber: "5547999098173",
  whatsappDefaultMessage: "Olá! Vim pelo site e gostaria de orientação jurídica.",

  // Endereço opcional para envio real dos formulários (ex.: Formspree, Getform,
  // Netlify Forms ou um serviço próprio). Deixe vazio para usar o WhatsApp.
  formEndpoint: "",

  socialLinks: [
    { name: "Facebook", icon: "facebook.svg", url: "https://www.facebook.com/profile.php?id=100067928511600" },
    { name: "Instagram", icon: "instagram.svg", url: "https://www.instagram.com/silvaecardoso_advogados/" },
    { name: "TikTok", icon: "tiktok.svg", url: "https://www.tiktok.com/@silvaecardosoadv" },
    { name: "X (Twitter)", icon: "x.svg", url: "https://x.com/scadvogadoass" }
  ],

  copyright: "© 2026 Silva & Cardoso Advogados e Associados. Todos os direitos reservados."
};
