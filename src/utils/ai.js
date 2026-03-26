import { checkWinner, getEmptySquares } from './gameLogic';
const getRandomMove = (board) => {
  const emptySquares = getEmptySquares(board);
  if (emptySquares.length === 0) return -1;
  
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};
const minimax = (board, depth, isMaximizing, aiPlayer, humanPlayer) => {
  const winner = checkWinner(board);
  
  if (winner && winner.winner === aiPlayer) return 10 - depth;
  if (winner && winner.winner === humanPlayer) return depth - 10;
  if (getEmptySquares(board).length === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        let score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = humanPlayer;
        let score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
const getBestMove = (board, aiPlayer) => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = aiPlayer;
      let score = minimax(board, 0, false, aiPlayer, humanPlayer);
      board[i] = null;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  
  return bestMove;
};

export const getAIMove = (board, isHard = false) => {
  const aiPlayer = 'O'; 
  
  if (isHard) {
    return getBestMove([...board], aiPlayer);
  } else {
    return getRandomMove(board);
  }
};