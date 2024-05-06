import React, { useState, useEffect } from 'react';
import './App.css';
import cardsData from './assets/cards.json';

const CardSelect = ({ label, onCardChange, cardsData }) => {
  const [selectedCard, setSelectedCard] = useState('');

  const handleCardChange = (event) => {
    const selectedImage = cardsData.find(card => card.code === event.target.value).image;
    setSelectedCard(selectedImage);
    onCardChange(selectedImage);
  };

  return (
    <div className="card-select">
      <label>{label}</label>
      <select onChange={handleCardChange} value={selectedCard}>
        <option value="">Select a Card</option>
        {cardsData.map(card => (
          <option key={card.code} value={card.code}>{card.code}</option>
        ))}
      </select>
      {selectedCard && (
        <img src={selectedCard} alt="Selected Card" className="card-image" />
      )}
    </div>
  );
};

const PlayerInput = ({ id, cardsData }) => {
  return (
    <div className="player">
      <h3>Player {id}</h3>
      <CardSelect label="Card 1" onCardChange={() => {}} cardsData={cardsData} />
      <CardSelect label="Card 2" onCardChange={() => {}} cardsData={cardsData} />
    </div>
  );
};

const CommunityCards = ({ cardsData }) => {
  return (
    <div className="community-cards">
      <CardSelect label="Flop 1" onCardChange={() => {}} cardsData={cardsData} />
      <CardSelect label="Flop 2" onCardChange={() => {}} cardsData={cardsData} />
      <CardSelect label="Flop 3" onCardChange={() => {}} cardsData={cardsData} />
      <CardSelect label="Turn" onCardChange={() => {}} cardsData={cardsData} />
      <CardSelect label="River" onCardChange={() => {}} cardsData={cardsData} />
    </div>
  );
};

function App() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.cards.map(card => ({
          code: card.code,
          image: card.image
        }));
        setCardsData(formattedData);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Poker Odds Calculator</h1>
        <label>Number of Players: </label>
        <select value={numPlayers} onChange={e => setNumPlayers(Number(e.target.value))}>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i + 2} value={i + 2}>{i + 2}</option>
          ))}
        </select>
      </header>
      <div className="player-inputs">
        {Array.from({ length: numPlayers }, (_, i) => (
          <PlayerInput key={i} id={i + 1} cardsData={cardsData} />
        ))}
      </div>
      <CommunityCards cardsData={cardsData} />
      <button onClick={() => alert("Calculation logic not implemented")}>Calculate Odds</button>
    </div>
  );
}

export default App;