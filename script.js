const visor = document.querySelector(".visor");
const botoes = document.querySelectorAll(".botoes button");

let valorAtual = "";
let valorAnterior = "";
let operacao = "";
let aguardandoNovoNumero = false;

function atualizarVisor(valor) {
  visor.value = valor || "0";
}

function adicionarNumero(numero) {
  if (aguardandoNovoNumero) {
    valorAtual = numero;
    aguardandoNovoNumero = false;
  } else {
    valorAtual =
      valorAtual === "0"
        ? numero
        : valorAtual + numero;
  }

  atualizarVisor(valorAtual);
}

function escolherOperacao(novaOperacao) {
  if (valorAtual === "") return;

  // Permite trocar a operação antes de digitar outro número
  if (aguardandoNovoNumero) {
    operacao = novaOperacao;
    return;
  }

  // Calcula automaticamente operações encadeadas
  if (valorAnterior !== "" && operacao !== "") {
    calcular();
  }

  valorAnterior = valorAtual;
  operacao = novaOperacao;
  aguardandoNovoNumero = true;
}

function calcular() {
  if (
    valorAnterior === "" ||
    valorAtual === "" ||
    operacao === "" ||
    aguardandoNovoNumero
  ) {
    return;
  }

  const primeiroNumero = Number(valorAnterior);
  const segundoNumero = Number(valorAtual);

  let resultado;

  switch (operacao) {
    case "+":
      resultado = primeiroNumero + segundoNumero;
      break;

    case "−":
      resultado = primeiroNumero - segundoNumero;
      break;

    case "×":
      resultado = primeiroNumero * segundoNumero;
      break;

    case "÷":
      if (segundoNumero === 0) {
        atualizarVisor("Não é possível dividir por zero");
        reiniciarValores();
        return;
      }

      resultado = primeiroNumero / segundoNumero;
      break;

    default:
      return;
  }

  // Evita resultados como 0.30000000000000004
  resultado = Number(resultado.toFixed(10));

  valorAtual = String(resultado);
  valorAnterior = "";
  operacao = "";
  aguardandoNovoNumero = true;

  atualizarVisor(valorAtual);
}

function limparCalculadora() {
  valorAtual = "";
  valorAnterior = "";
  operacao = "";
  aguardandoNovoNumero = false;

  atualizarVisor("0");
}

function reiniciarValores() {
  valorAtual = "";
  valorAnterior = "";
  operacao = "";
  aguardandoNovoNumero = true;
}

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const valorBotao = botao.textContent.trim();

    if (!Number.isNaN(Number(valorBotao))) {
      adicionarNumero(valorBotao);
      return;
    }

    if (valorBotao === "C") {
      limparCalculadora();
      return;
    }

    if (valorBotao === "=") {
      calcular();
      return;
    }

    if (["+", "−", "×", "÷"].includes(valorBotao)) {
      escolherOperacao(valorBotao);
    }
  });
});