export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
export const checkWinner = (board) => {
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        line: combination
      };
    }
  }
  return null;
};

export const checkDraw = (board) => {
  return board.every(square => square !== null) && !checkWinner(board);
};


export const getEmptySquares = (board) => {
  return board.reduce((empty, square, index) => {
    if (square === null) empty.push(index);
    return empty;
  }, []);
};
