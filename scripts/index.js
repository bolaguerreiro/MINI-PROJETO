const inputElemento = document.querySelector("input");
const listaElemento = document.querySelector(".list");
const buttonElemento = document.querySelector("button");

function adicionarInteresse() {
  const novoInteresse = inputElemento.value;
    // Atualiza a lista no localStorage
    localStorage.setItem("meus-interesses", JSON.stringify(novoInteresse));

  if (novoInteresse) {
    // Atualiza a lista exibida na página
    // const listaInteresses = document.getElementById("lista-interesses");
    const novoItemLista = document.createElement("ul");
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Excluir";
    novoItemLista.classList.add("lista-interesses");
    novoItemLista.innerText = novoInteresse;
    listaElemento.appendChild(novoItemLista);
    inputElemento.value = "";
  } else {
    alert("Informe um valor");
  }
}

// Recupera a lista de interesses do localStorage
function exibirInteresses() {
  const interesses = JSON.parse(localStorage.getItem("meus-interesses"));

  if (interesses && interesses.length > 0) {
    const listaInteresses = document.getElementById("lista-interesses");

    interesses.forEach((interesse) => {
      const itemLista = document.createElement("ul");
      itemLista.classList.add("lista-interesses");
      itemLista.textContent = interesse;
      listaElemento.appendChild(itemLista);
    });
  }
}

// Recupera os interesses existentes e exibe na página
exibirInteresses();

// Adiciona o evento de clicar o botão "Adicionar"
buttonElemento.addEventListener("click", adicionarInteresse);
