type Board = string;

export const isMovePossible = (board: Board): boolean => {
    const xCount = board.split('x').length - 1;
    const oCount = board.split('o').length - 1;
    return xCount === oCount || xCount === oCount + 1;
}

export const getValidMoves = (board: Board): number[] => {
    const moves = board.split('').reduce((moves, cell, i) =>
        cell === '-' ? moves.concat(i) : moves
        , []);
    console.log('valid moves:', moves);
    return moves;
}

export const isTieBoard = (board: Board): boolean => {
    return !board.includes('-');
}
export function isWinningBoard(board: Board, player: string): boolean {
    const winningLines = [
        '012', '345', '678', // rows
        '036', '147', '258', // columns
        '048', '246', // diagonals
    ];
    return winningLines.some(line =>
        line.split('').every(i => board[Number(i)] === player)
    );
}

export const checkWinner = (board: Board): string | null => {
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
