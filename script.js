const inputCep = document.getElementById("cep");
const inputLogradouro = document.getElementById("logradouro");
const inputNumero = document.getElementById("numero");
const inputBairro = document.getElementById("bairro");
const inputCidade = document.getElementById("cidade");
const inputUF = document.getElementById("uf");

inputCep.addEventListener("input", (event) => {
  inputCep.value = inputCep.value.replace(/\D/g, "");
});

inputCep.addEventListener("blur", async () => {
  const cep = inputCep.value;

  if (cep.length !== 8) {
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado");
      throw new Error("CEP não encontrado");
    }

    inputLogradouro.value = data.logradouro || "";
    inputBairro.value = data.bairro || "";
    inputCidade.value = data.localidade || "";
    inputUF.value = data.uf || "";

    inputNumero.focus();
  } catch (error) {
    console.error("Erro ao buscar CEP:", error.message);
  }
});
