const API_URL = "http://localhost:3000/filmes";

function adicionarAosFavoritos(idFilme) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.includes(idFilme)) {
        alert("Este filme já está nos favoritos!");
        return;
    }

    favoritos.push(idFilme);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    alert("Filme adicionado aos favoritos!");
}

function carregarFilmes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(filmes => {
            const container = document.getElementById('container-filmes');
            container.innerHTML = '';

            filmes.forEach(filme => {
                const col = document.createElement('div');
                col.className = 'col';

                col.innerHTML = `
                    <div class="card h-100">
                        <a href="detalhes.html?id=${filme.id}">
                            <img src="${filme.poster}" class="card-img-top" alt="${filme.titulo}">
                        </a>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${filme.titulo}</h5>
                            <p class="card-genero">${filme.genero}</p>
                            <button class="botaofavorito mt-auto" onclick="adicionarAosFavoritos(${filme.id})">
                                Adicionar aos Favoritos
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar filmes:", error);
        });
}

document.addEventListener("DOMContentLoaded", carregarFilmes);
