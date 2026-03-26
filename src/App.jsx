import React, { useState } from 'react';
import Game from './components/Game';
import GameMode from './components/GameMode';
import './App.css';

const App=()=> {
  const [gameMode, setGameMode] = useState(null); 

  return (
    <div className="app">
      <h1>🎮 Tic-Tac-Toe</h1>
      {!gameMode ? (
        <GameMode setGameMode={setGameMode} />
      ) : (
        <Game gameMode={gameMode} setGameMode={setGameMode} />
      )}
    </div>
  );
}

export default App;

