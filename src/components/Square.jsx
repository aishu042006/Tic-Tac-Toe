import React from 'react';

const Square = ({ value, onClick, isWinning, disabled }) => {
  return (
    <button 
      className={`square ${value ? `square-${value}` : ''} ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Square;
