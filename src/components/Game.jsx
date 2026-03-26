import React, { useState, useEffect } from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';
import { checkWinner, checkDraw } from '../utils/gameLogic';
import { getAIMove } from '../utils/ai';

const Game = ({ gameMode, setGameMode }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningLine, setWinningLine] = useState([]);
  useEffect(() => {
    const makeAIMove = () => {
      if (gameMode !== '2player' && !isXNext && !winner) {
        setTimeout(() => {
          const aiMove = getAIMove(board, gameMode === 'hard');
          if (aiMove !== -1) {
            handleMove(aiMove);
          }
        }, 500);
      }
    };

    makeAIMove();
  }, [isXNext, gameMode, board, winner]);

  const handleMove = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner.winner);
      setWinningLine(gameWinner.line);
      setScores(prev => ({
        ...prev,
        [gameWinner.winner]: prev[gameWinner.winner] + 1
      }));
    }

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const getGameStatus = () => {
    if (winner) {
      return `🏆 Winner: ${winner}`;
    } else if (checkDraw(board)) {
      return "🤝 It's a Draw!";
    } else {
      return `🎮 Player ${isXNext ? 'X' : 'O'}'s turn`;
    }
  };

  return (
    <div className="game">
      <div className="game-header">
        <button className="back-btn" onClick={() => setGameMode(null)}>
          ← Change Mode
        </button>
        <button className="reset-btn" onClick={resetGame}>
          🔄 New Game
        </button>
        <button className="reset-scores-btn" onClick={resetScores}>
          📊 Reset Scores
        </button>
      </div>

      <Scoreboard scores={scores} />

      <div className="game-status">
        <h3>{getGameStatus()}</h3>
      </div>

      <Board 
        board={board} 
        onClick={handleMove} 
        winningLine={winningLine}
        disabled={winner || (!isXNext && gameMode !== '2player')}
      />

      <div className="game-mode-indicator">
        Mode: {
          gameMode === '2player' ? '👥 Two Players' :
          gameMode === 'easy' ? '🤖 Easy AI' : '🧠 Hard AI'
        }
      </div>
    </div>
  );
};

export default Game;