document.addEventListener("DOMContentLoaded", function () {
  const inputElemento = document.getElementById("novo-interesse");
  const listaElemento = document.getElementById("lista-interesses");
  const buttonElemento = document.getElementById("adicionar");
  const buttonLimpaLista = document.querySelector(".button-clear");
  
  inputElemento.focus();

  // Função para salvar os interesses atuais no localStorage.
  function salvarInteresses() {
    const interesses = [];
    // Coleta todos os textos dos itens da lista e os salva em um array.
    document.querySelectorAll("#lista-interesses li span").forEach((span) => {
      interesses.push(span.textContent);
    });
    // Salva o array de interesses no localStorage.
    localStorage.setItem("meus-interesses", JSON.stringify(interesses));
  }

  // Função para adicionar um novo item à lista de interesses.
  function adicionarItem(texto) {
    const item = document.createElement("li");
    const itemText = document.createElement("span");
    itemText.textContent = texto;
    item.appendChild(itemText);

    // Cria um contêiner para os botões.
    const buttonContainer = document.createElement("div");

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit";
    editButton.onclick = function () {
      const novoTexto = prompt("Edite seu interesse:", itemText.textContent);
      if (novoTexto) itemText.textContent = novoTexto; // Atualiza o texto se for modificado.
      salvarInteresses(); // Salva os novos interesses no localStorage.
    };
    buttonContainer.appendChild(editButton); // Adiciona o botão de editar ao contêiner.

    // Cria e configura o botão de excluir.
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.className = "delete";
    deleteButton.onclick = function () {
      listaElemento.removeChild(item); // Remove o item da lista.
      salvarInteresses(); // Atualiza o localStorage após a remoção.
    };
    buttonContainer.appendChild(deleteButton); // Adiciona o botão de excluir ao contêiner.

    // Adiciona o contêiner de botões ao item da lista.
    item.appendChild(buttonContainer);
    // Adiciona o item completo à lista no DOM.
    listaElemento.appendChild(item);

    // Adiciona uma funcionalidade para marcar o item como concluído.
    itemText.onclick = function () {
      item.classList.toggle("done");
    };
  }

  // Adiciona um ouvinte de evento ao botão de adicionar que cria um novo item.
  buttonElemento.addEventListener("click", function () {
    const novaTarefa = inputElemento.value.trim();
    if (novaTarefa) {
      adicionarItem(novaTarefa);
      inputElemento.value = ""; // Limpa o campo de entrada após adicionar.
      salvarInteresses(); // Salva o novo estado dos interesses.
      inputElemento.focus();
    } else {
      alert("Por favor, digite um interesse!"); // Alerta se o campo de entrada estiver vazio.
    }
  });

  // Função para exibir os interesses salvos no localStorage quando a página é carregada.
  function exibirInteresses() {
    const interesses = JSON.parse(localStorage.getItem("meus-interesses"));
    listaElemento.innerHTML ="";
    if (interesses) {
      interesses.forEach((interesse) => {
        adicionarItem(interesse);
      });
    }
  }

  // Função para limpar todos os interesses tanto do DOM quanto do localStorage.
  function limpaLista() {
    localStorage.removeItem("meus-interesses");
    listaElemento.innerHTML = "";
  }

  // Chama as funções para exibir os interesses e adicionar os eventos necessários.
  exibirInteresses();
  buttonLimpaLista.addEventListener("click", limpaLista);
  setInterval(exibirInteresses,1000)
});



// ---------- Obter Noticias ------------------
async function obterNoticia() {
  try {
    const url =
      "https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release";
    const response = await fetch(url);
    const data = await response.json();
    const primeiraNoticias = data.items[0];
    const titulo = primeiraNoticias.titulo;

    if (titulo) {
      const elementoTitulo = document.querySelector(".title-news-today");
      if (elementoTitulo) {
        elementoTitulo.textContent = titulo;
      }
    }
  } catch (error) {
    alert("Erro ao obter notícia:", error);
  }
}


obterNoticia();
