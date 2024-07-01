// Esse evento executa a função assim que a pagina for totalmente carregada
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

    // Cria uma div para os botões.
    const buttonContainer = document.createElement("div");

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit";
    editButton.onclick = function () {
      const novoTexto = prompt("Edite seu interesse:", itemText.textContent);
      if (novoTexto) itemText.textContent = novoTexto;
      salvarInteresses(); 
    };

    // Evento para adicionar o botão de editar
    buttonContainer.appendChild(editButton); 

    // Cria e configura o botão de excluir.
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.className = "delete";
    deleteButton.onclick = function () {
      listaElemento.removeChild(item);
      salvarInteresses();
    };
    // Evento para adicionar o botão de excluir
    buttonContainer.appendChild(deleteButton); 

    item.appendChild(buttonContainer);
 
    listaElemento.appendChild(item);

    // Adiciona uma funcionalidade para riscar o item como concluido.
    itemText.onclick = function () {
      item.classList.toggle("done");
    };
  }

  // Evento para adicionar novo item a lista de interesses
  buttonElemento.addEventListener("click", function () {
    const novoItem = inputElemento.value.trim();
    if (novoItem) {
      adicionarItem(novaTarefa);
      inputElemento.value = ""; // Limpa o campo de entrada.
      salvarInteresses(); 
      inputElemento.focus();
    } else {
      alert("Por favor, digite um interesse!");
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

  
// Obtem noticias através da api fetch
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

  // Chama as funções para exibir os interesses e adicionar os eventos necessários.
  exibirInteresses();
  buttonLimpaLista.addEventListener("click", limpaLista);
  setInterval(exibirInteresses,1000)
  obterNoticia();

});





