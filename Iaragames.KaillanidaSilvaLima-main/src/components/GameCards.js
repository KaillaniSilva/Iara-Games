import React, { useState, useEffect } from 'react';
import './GameCards.css';

// Lista de todos os cards
const todosCards = [
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

const GameCards = () => {
  const [cardsExibidos, setCardsExibidos] = useState(3);
  const qtdePorClique = 3;

  const carregarMaisCards = () => {
    setCardsExibidos(prev => prev + qtdePorClique);
  };

  const cardsParaExibir = todosCards.slice(0, cardsExibidos);
  const temMaisCards = cardsExibidos < todosCards.length;

  return (
    <section className="container my-5" id="jogos">
      <h2 className="mb-4" style={{ color: 'white' }}>Jogos</h2>
      <div className="row g-4" id="cardsContainer">
        {cardsParaExibir.map((card, index) => (
          <div key={index} className="col-md-4">
            <div className="card bg-black text-white border-0 h-100">
              <div className="image-wrapper">
                <img src={card.imagem} className="img-fluid game-image" alt={card.titulo} />
              </div>
              <div className="card-body">
                <small className="text-muted">Iara Games Brasil</small>
                <h5 className="card-title mt-2">{card.titulo}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {temMaisCards && (
        <div className="text-center my-5">
          <button 
            className="btn btn-vermais text-white"
            onClick={carregarMaisCards}
          >
            Ver mais
          </button>
        </div>
      )}
    </section>
  );
};

export default GameCards;

