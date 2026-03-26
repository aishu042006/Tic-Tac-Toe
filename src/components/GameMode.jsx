import React from 'react';

const GameMode = ({ setGameMode }) => {
  return (
    <div className="game-mode">
      <h2>Select Game Mode</h2>
      <div className="mode-buttons">
        <button onClick={() => setGameMode('2player')}>
          👥 Two Players
        </button>
        <button onClick={() => setGameMode('easy')}>
          🤖 Easy AI
        </button>
        <button onClick={() => setGameMode('hard')}>
          🧠 Hard AI (Unbeatable)
        </button>
      </div>
    </div>
  );
};

export default GameMode;
