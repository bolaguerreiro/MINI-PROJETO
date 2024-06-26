function recuperarInteresses() {
    // Recupera a lista de interesses do localStorage
    const interesses = JSON.parse(localStorage.getItem('meus-interesses'));
  
    // Seleciona a lista <ul> onde os interesses serão incluídos
    const listaInteresses = document.querySelector('#lista-interesses');
  
    // Verifica se existem interesses armazenados
    if (interesses) {
      // Itera sobre o array de interesses e cria um elemento <li> para cada um
      interesses.forEach(interesse => {
        const itemLista = document.createElement('li');
        itemLista.textContent = interesse;
        listaInteresses.appendChild(itemLista);
      });
    }
  }