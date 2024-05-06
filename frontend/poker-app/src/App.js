import React, { useState, useEffect } from 'react';
import './App.css';

const CardSelect = ({ onCardChange, cards }) => {
  return (
    <select onChange={onCardChange} defaultValue="">
      <option value="" disabled>Select a Card</option>
      {cards.map(card => (
        <option key={card.code} value={card.image}>{card.code}</option>
      ))}
    </select>
  );
};

const PlayerRow = ({ id, cards }) => {
  const [card1Image, setCard1Image] = useState('');
  const [card2Image, setCard2Image] = useState('');

  const handleCard1Change = event => {
    setCard1Image(event.target.value);
  };

  const handleCard2Change = event => {
    setCard2Image(event.target.value);
  };

  return (
    <div className="row">
      <div className="column type1">
        <div className="player-title">Player {id}</div>  {/* Apply the new class here */}
        <CardSelect onCardChange={handleCard1Change} cards={cards} />
        <CardSelect onCardChange={handleCard2Change} cards={cards} />
      </div>
      <div className="column type2">
        {card1Image && <img src={card1Image} alt="Card 1" />}
      </div>
      <div className="column type2">
        {card2Image && <img src={card2Image} alt="Card 2" />}
      </div>
    </div>
  );
};

function App() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
      .then(response => response.json())
      .then(data => {
        if (data.success && data.cards) {
          setCards(data.cards);
        }
      })
      .catch(error => console.error('Failed to fetch cards:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Poker Odds Calculator</h1>
        <label>Number of Players:</label>
        <select value={numPlayers} onChange={e => setNumPlayers(Number(e.target.value))}>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i + 2} value={i + 2}>{i + 2}</option>
          ))}
        </select>
      </header>
      {Array.from({ length: numPlayers }, (_, i) => (
        <PlayerRow key={i} id={i + 1} cards={cards} />
      ))}
    </div>
  );
}

export default App;