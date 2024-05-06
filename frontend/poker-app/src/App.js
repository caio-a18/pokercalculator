import React, { useState } from 'react';
import './App.css';

// Component to handle input of two cards for each player
const PlayerInput = ({ id }) => {
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');

  return (
    <div className="player">
      <h3>Player {id}</h3>
      <input placeholder="Card 1" value={card1} onChange={e => setCard1(e.target.value.toUpperCase())} />
      <input placeholder="Card 2" value={card2} onChange={e => setCard2(e.target.value.toUpperCase())} />
    </div>
  );
};

// Component to handle input of community cards
const CommunityCards = () => {
  const [flop1, setFlop1] = useState('');
  const [flop2, setFlop2] = useState('');
  const [flop3, setFlop3] = useState('');
  const [turn, setTurn] = useState('');
  const [river, setRiver] = useState('');

  return (
    <div className="community-cards">
      <input placeholder="Flop 1" value={flop1} onChange={e => setFlop1(e.target.value.toUpperCase())} />
      <input placeholder="Flop 2" value={flop2} onChange={e => setFlop2(e.target.value.toUpperCase())} />
      <input placeholder="Flop 3" value={flop3} onChange={e => setFlop3(e.target.value.toUpperCase())} />
      <input placeholder="Turn" value={turn} onChange={e => setTurn(e.target.value.toUpperCase())} />
      <input placeholder="River" value={river} onChange={e => setRiver(e.target.value.toUpperCase())} />
    </div>
  );
};

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