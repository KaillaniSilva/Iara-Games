// Alterna visibilidade do texto de detalhes
document.getElementById('saibaMaisBtn').addEventListener('click', function () {
  const detalhes = document.getElementById('detalhesGTA');
  detalhes.classList.toggle('d-none');
});

// Validação do formulário de newsletter
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const sucesso = document.getElementById('mensagemSucesso');

  if (nome && email.includes('@') && email.includes('.')) {
    sucesso.classList.remove('d-none');
    sucesso.textContent = "Cadastro realizado com sucesso!";
    this.reset();
  } else {
    sucesso.classList.add('d-none');
    alert('Preencha os campos corretamente.');
  }
});

// Lista de todos os cards
const todosCards = [
  // Iniciais
  {
    titulo: "Grand Theft Auto V",
    imagem: "./Imagens/GTA 5.jpeg"
  },
  {
    titulo: "Red Dead Redemption 2",
    imagem: "./Imagens/RED DEAD.jpeg"
  },
  {
    titulo: "Bully",
    imagem: "./Imagens/Bully.jpeg"
  },
  // Extras 1
  {
    titulo: "Call Of Duty",
    imagem: "./Imagens/Call Dutty.jpeg"
  },
  {
    titulo: "Gears of War",
    imagem: "./Imagens/GEARS OF WAR.jpeg"
  },
  {
    titulo: "Grand Theft Auto IV",
    imagem: "./Imagens/GTA 4.jpeg"
  },
  // Extras 2
  {
    titulo: "Grand Theft Auto VI",
    imagem: "./Imagens/GTA 6 POSTER.jpeg"
  },
  {
    titulo: "Grand Theft Auto San Andres",
    imagem: "./Imagens/GTA SAN ANDRES.jpeg"
  },
  {
    titulo: "Call of Duty: Warzone",
    imagem: "./Imagens/Call Dutty.jpeg"
  }
];

let cardsExibidos = 0;
const qtdePorClique = 3;

function criarCard({ titulo, imagem }) {
  return `
    <div class="col-md-4">
      <div class="card bg-black text-white border-0 h-100">
        <div class="image-wrapper">
          <img src="${imagem}" class="img-fluid game-image" alt="${titulo}">
        </div>
        <div class="card-body">
          <small class="text-muted">Iara Games Brasil</small>
          <h5 class="card-title mt-2">${titulo}</h5>
        </div>
      </div>
    </div>
  `;
}

function carregarMaisCards() {
  const container = document.getElementById('cardsContainer');
  const proximos = todosCards.slice(cardsExibidos, cardsExibidos + qtdePorClique);
  proximos.forEach(card => {
    container.insertAdjacentHTML('beforeend', criarCard(card));
  });
  cardsExibidos += proximos.length;

  // Oculta o botão se não houver mais cards
  if (cardsExibidos >= todosCards.length) {
    document.querySelector('.btn-vermais').classList.add('d-none');
  }
}

// Ao carregar a página, mostra os primeiros 3
document.addEventListener('DOMContentLoaded', () => {
  carregarMaisCards();
});

// Botão "Ver mais" carrega +3 a cada clique
document.querySelector('.btn-vermais').addEventListener('click', function (e) {
  e.preventDefault();
  carregarMaisCards();
});
