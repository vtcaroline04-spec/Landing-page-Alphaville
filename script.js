const WHATSAPP = "5521970929173";

function linkWhatsapp(mensagem) {
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagem);
}

/* 1. Formulário (só existe na página inicial): monta a mensagem e abre o WhatsApp */
const formulario = document.getElementById("formulario");
if (formulario) {
  // Máscara simples do telefone: (00) 00000-0000
  const campoTelefone = document.getElementById("telefone");
  campoTelefone.addEventListener("input", function () {
    const n = campoTelefone.value.replace(/\D/g, "").slice(0, 11);
    let t = n;
    if (n.length > 6) t = "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7);
    else if (n.length > 2) t = "(" + n.slice(0, 2) + ") " + n.slice(2);
    campoTelefone.value = t;
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const dados = new FormData(formulario);
    const pegar = function (campo) { return String(dados.get(campo) || "").trim(); };

    const linhas = [
      "Olá! Vim pelo site do Alphaville 1 e gostaria de ajuda para encontrar um imóvel.",
      "",
      "Nome: " + pegar("nome"),
      "Telefone: " + pegar("telefone")
    ];
    if (pegar("email")) linhas.push("E-mail: " + pegar("email"));
    linhas.push("Procuro: " + pegar("tipo"));
    if (pegar("regiao")) linhas.push("Região: " + pegar("regiao"));
    linhas.push("Investimento: " + pegar("faixa"));
    linhas.push("Financiar: " + pegar("financiar"));
    linhas.push("Objetivo: " + pegar("objetivo"));
    if (pegar("preferencia")) linhas.push("Preferências: " + pegar("preferencia"));

    window.open(linkWhatsapp(linhas.join("\n")), "_blank", "noopener");
  });
}

/* 2. Menu do celular: abre e fecha (e fecha ao escolher um item) */
const menuBotao = document.getElementById("menu-botao");
const nav = document.getElementById("nav");

menuBotao.addEventListener("click", function () {
  const aberto = nav.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", aberto);
});

nav.addEventListener("click", function (evento) {
  if (evento.target.tagName === "A") {
    nav.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  }
});


document.getElementById("ano").textContent = new Date().getFullYear();
