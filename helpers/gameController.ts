type Board = string;

export function isMovePossible (board: Board): boolean {
    const xCount = board.split('x').length - 1;
    const oCount = board.split('o').length - 1;
    return xCount === oCount || xCount === oCount + 1;
}
export function checkWinner(board: Board): string | null {
  const winningLines = [
    '012', '345', '678', // rows
    '036', '147', '258', // columns
    '048', '246', // diagonals
  ];
  
  for (const line of winningLines) {
    const [a, b, c] = line.split('').map(Number);
    if (board[a] !== '-' && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  
  return null;
}