function exibirFavoritos() {
  const container = document.getElementById('listafavoritos');
  container.innerHTML = '';
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  fetch('http://localhost:3000/filmes')
    .then(response => response.json())
    .then(filmes => {
      if (favoritos.length === 0) {
        container.innerHTML = `
          <div class="col-12 text-center">
            <p class="fs-4 mt-5">Você ainda não tem filmes favoritos.</p>
            <a href="index.html" class="botao mt-3">Ver filmes</a>
          </div>
        `;
        return;
      }

      favoritos.forEach(id => {
        const filme = filmes.find(f => f.id === id);
        if (filme) {
          const card = document.createElement('div');
          card.classList.add('col');
          card.innerHTML = `
            <div class="card">
              <a href="detalhes.html?id=${filme.id}">
                <img src="${filme.poster}" class="card-img-top" alt="${filme.titulo}">
              </a>
              <div class="card-body">
                <h5 class="card-title">${filme.titulo}</h5>
                <p class="card-genero">${filme.genero}</p>
                <button class="btn btn-danger" onclick="removerDosFavoritos(${filme.id})">Tirar dos Favoritos</button>
              </div>
            </div>
          `;
          container.appendChild(card);
        }
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os filmes:', error);
    });
}

function removerDosFavoritos(idFilme) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(id => id !== idFilme);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  exibirFavoritos();
}

document.addEventListener('DOMContentLoaded', exibirFavoritos);
