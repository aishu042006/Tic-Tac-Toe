import React from 'react';

const Scoreboard = ({ scores }) => {
  return (
    <div className="scoreboard">
      <div className="score">
        <span className="player-x">Player X</span>
        <span className="score-value">{scores.X}</span>
      </div>
      <div className="score-divider">:</div>
      <div className="score">
        <span className="player-o">Player O</span>
        <span className="score-value">{scores.O}</span>
      </div>
    </div>
  );
};

export default Scoreboard;