import React, { useState } from 'react';
import './App.css';
import cardsData from './assets/cards.json';

// Dropdown and Image Display Component
const CardSelect = ({ label, onCardChange }) => {
  const [selectedCard, setSelectedCard] = useState('');

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
    onCardChange(event.target.value);
  };

  return (
    <div className="card-select">
      <label>{label}</label>
      <select onChange={handleCardChange} value={selectedCard}>
        <option value="">Select a Card</option>
        {cardsData.map(card => (
          <option key={card.code} value={card.image}>{card.code}</option>
        ))}
      </select>
      {selectedCard && (
        <img src={selectedCard} alt="Selected Card" className="card-image" />
      )}
    </div>
  );
};

// Player Card Input Component
const PlayerInput = ({ id }) => {
  return (
    <div className="player">
      <h3>Player {id}</h3>
      <CardSelect label="Card 1" onCardChange={() => {}} />
      <CardSelect label="Card 2" onCardChange={() => {}} />
    </div>
  );
};

// Community Cards Input Component
const CommunityCards = () => {
  return (
    <div className="community-cards">
      <CardSelect label="Flop 1" onCardChange={() => {}} />
      <CardSelect label="Flop 2" onCardChange={() => {}} />
      <CardSelect label="Flop 3" onCardChange={() => {}} />
      <CardSelect label="Turn" onCardChange={() => {}} />
      <CardSelect label="River" onCardChange={() => {}} />
    </div>
  );
};

// Main App Component
function App() {
  const [numPlayers, setNumPlayers] = useState(2);

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
          <PlayerInput key={i} id={i + 1} />
        ))}
      </div>
      <CommunityCards />
      <button onClick={() => alert("Calculation logic not implemented")}>Calculate Odds</button>
    </div>
  );
}

export default App;