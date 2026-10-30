/* =========================================================
   LISTA DE IMÓVEIS DO ALPHAVILLE
   Para adicionar um imóvel, copie um bloco { ... } e mude os valores.
   tipo:    "casa" ou "terreno"
   codigo:  código do imóvel (aparece na foto)
   foto:    nome do arquivo dentro de img/imoveis/ (ex.: "CA4721.jpg")
            OU o endereço completo da imagem (ex.: "https://site.com/foto.jpg")
            Sem foto, aparece um fundo cinza.
   link:    página do imóvel no site de vocês (deixe "" para esconder o botão)
   O primeiro imóvel veio do seu print; os outros são exemplos: troque pelos reais.
   ========================================================= */
const imoveis = [
  {
    codigo: "CA4721", tipo: "casa", operacao: "Venda",
    rua: "Alphaville 2",
    titulo: "Casa com 3 dormitórios à venda, 370m² - Terras Alphaville 2 (Inoã) - Maricá/RJ",
    bairro: "Inoã", cidade: "Maricá - RJ",
    detalhe: "3 quartos(2 suítes), 370m²", preco:  1590000,
    foto: "ca4721.jpg", link: "https://viannaalvesimoveis.com.br/imovel/CA4721"
  },
  {
    codigo: "TE7701", tipo: "terreno", operacao: "Venda",
    rua: "Rua Exemplo, SN",
    titulo: "Terreno, QD120 LT08",
    bairro: "Jardim Atlântico Central (Itaipuaçu)", cidade: "Maricá - RJ",
    detalhe: "450 m²", preco: 120000,
    foto: "te7701.jpg", link: "https://www.seusite.com.br/te7701"
  },
  {
    codigo: "CA3102", tipo: "casa", operacao: "Venda",
    rua: "Rua Exemplo, 120",
    titulo: "Casa, QD050 LT03",
    bairro: "Jardim Atlântico Central (Itaipuaçu)", cidade: "Maricá - RJ",
    detalhe: "3 quartos · 210 m²", preco: 980000,
    foto: "ca3102.jpg", link: "https://www.seusite.com.br/ca3102"
  }
];
 
let tipoAtual = "";
 
function formatarPreco(valor) {
  return "R$ " + valor.toLocaleString("pt-BR");
}
 
/* Se a foto começar com "http" usa o endereço completo; senão procura em img/imoveis/ */
function caminhoFoto(foto) {
  return foto.indexOf("http") === 0 ? foto : "img/imoveis/" + foto;
}
 
function desenharLinha(i) {
  const mensagem = "Olá! Tenho interesse no imóvel " + i.codigo + " (" + i.titulo + ") do Alphaville. Pode me passar mais informações?";
 
  // Botão "Ver no site": só aparece se o imóvel tiver link
  const botaoSite = i.link
    ? '<a class="btn btn--vazado" target="_blank" rel="noopener" href="' + i.link + '">Ver no site</a>'
    : "";
 
  return (
    '<article class="linha">' +
      '<div class="linha__principal">' +
        '<div class="linha__foto foto" role="button" tabindex="0" aria-label="Ampliar foto ' + i.codigo + '" ' +
          'data-foto="' + caminhoFoto(i.foto) + '" ' +
          'style="background-image: url(\'' + caminhoFoto(i.foto) + '\'), var(--placeholder);">' +
          '<span class="codigo">' + i.codigo + '</span></div>' +
        '<div class="linha__texto">' +
          '<p class="linha__rua">' + i.rua + '</p>' +
          '<h3>' + i.titulo + '</h3>' +
          '<p class="linha__local">' + i.bairro + '</p>' +
          '<p class="linha__local">' + i.cidade + '</p>' +
          (i.detalhe ? '<p class="linha__detalhe">' + i.detalhe + '</p>' : '') +
        '</div>' +
        '<div class="linha__preco"><span class="rotulo">' + i.operacao + '</span>' +
          '<strong>' + formatarPreco(i.preco) + '</strong></div>' +
      '</div>' +
      '<div class="linha__acao">' +
        botaoSite +
        '<a class="btn" target="_blank" rel="noopener" href="' + linkWhatsapp(mensagem) + '">Tenho interesse</a>' +
      '</div>' +
    '</article>'
  );
}
 
function atualizarLista() {
  const resultado = imoveis.filter(function (i) {
    return !tipoAtual || i.tipo === tipoAtual;
  });
  document.getElementById("lista").innerHTML = resultado.map(desenharLinha).join("");
  const n = resultado.length;
  document.getElementById("contagem").textContent =
    n + (n === 1 ? " imóvel encontrado" : " imóveis encontrados");
}
 
/* Botões de filtro */
document.getElementById("filtro-tipo").addEventListener("click", function (evento) {
  const botao = evento.target.closest(".chip");
  if (!botao) return;
  tipoAtual = botao.dataset.valor;
  document.querySelectorAll("#filtro-tipo .chip").forEach(function (b) {
    b.classList.toggle("ativo", b === botao);
  });
  atualizarLista();
});
 
atualizarLista();
 
 
/* =========================================================
   FOTO AMPLIADA: clicar na foto abre ela inteira
   ========================================================= */
let fotoOrigem = null;
 
function fecharFoto() {
  const aberta = document.getElementById("zoom");
  if (aberta) aberta.remove();
  document.body.style.overflow = "";
  if (fotoOrigem) fotoOrigem.focus();
}
 
function abrirFoto(elemento) {
  fotoOrigem = elemento;
 
  const zoom = document.createElement("div");
  zoom.className = "zoom";
  zoom.id = "zoom";
  zoom.setAttribute("role", "dialog");
  zoom.setAttribute("aria-label", "Foto ampliada");
 
  const imagem = document.createElement("img");
  imagem.src = elemento.dataset.foto;
  imagem.alt = "Foto do imóvel";
  imagem.onerror = fecharFoto; // se o arquivo não existir, não abre nada
 
  const botao = document.createElement("button");
  botao.className = "zoom__fechar";
  botao.type = "button";
  botao.setAttribute("aria-label", "Fechar foto");
  botao.textContent = "✕";
 
  zoom.appendChild(imagem);
  zoom.appendChild(botao);
  document.body.appendChild(zoom);
  document.body.style.overflow = "hidden"; // trava a rolagem da página
  botao.focus();
}
 
// Clique na foto (ou no fundo escuro / botão ✕ para fechar)
document.addEventListener("click", function (evento) {
  const foto = evento.target.closest(".linha__foto");
  if (foto) { abrirFoto(foto); return; }
  if (evento.target.closest(".zoom") && evento.target.tagName !== "IMG") fecharFoto();
});
 
// Teclado: Enter/Espaço abre, Esc fecha
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") fecharFoto();
  const foto = evento.target.closest && evento.target.closest(".linha__foto");
  if (foto && (evento.key === "Enter" || evento.key === " ")) {
    evento.preventDefault();
    abrirFoto(foto);
  }
});
 