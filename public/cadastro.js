const API_URL = 'http://localhost:3000/filmes';
const form = document.getElementById('form-filme');
const tabela = document.querySelector('#tabela-filmes tbody');
const idInput = document.getElementById('filme-id');

function carregarFilmes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(filmes => {
      tabela.innerHTML = '';
      filmes.forEach(filme => {
        tabela.innerHTML += `
          <tr>
            <td>${filme.id}</td>
            <td>${filme.titulo}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="editarFilme(${filme.id})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="excluirFilme(${filme.id})">Excluir</button>
            </td>
          </tr>
        `;
      });
    });
}

function editarFilme(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(filme => {
      idInput.value = filme.id;
      document.getElementById('titulo').value = filme.titulo;
      document.getElementById('ano').value = filme.ano;
      document.getElementById('genero').value = filme.genero;
      document.getElementById('diretor').value = filme.diretor;
      document.getElementById('elenco').value = filme.cast;
      document.getElementById('descricao').value = filme.descricao;
      document.getElementById('poster').value = filme.poster;
      document.getElementById('trailer').value = filme.trailer;
    });
}

function excluirFilme(id) {
  if (confirm("Tem certeza que deseja excluir este filme?")) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => carregarFilmes());
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const filme = {
    titulo: document.getElementById('titulo').value,
    ano: parseInt(document.getElementById('ano').value),
    genero: document.getElementById('genero').value,
    diretor: document.getElementById('diretor').value,
    cast: document.getElementById('elenco').value,
    descricao: document.getElementById('descricao').value,
    poster: document.getElementById('poster').value,
    trailer: document.getElementById('trailer').value
  };

  const id = idInput.value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme)
  }).then(() => {
    form.reset();
    idInput.value = '';
    carregarFilmes();
  });
});

carregarFilmes();