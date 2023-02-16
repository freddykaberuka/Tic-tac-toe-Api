const express = require('express')
import type { Request, Response } from 'express';

type Board = string;

const isMovePossible = (board: Board): boolean => {
    const xCount = board.split('x').length - 1;
    const oCount = board.split('o').length - 1;
    return xCount === oCount || xCount === oCount + 1;
}



function getValidMoves(board: Board): number[] {
    const moves = board.split('').reduce((moves, cell, i) =>
        cell === '-' ? moves.concat(i) : moves
        , []);
    console.log('valid moves:', moves);
    return moves;
}

function isTieBoard(board: Board): boolean {
    return !board.includes('-');
}
function isWinningBoard(board: Board, player: string): boolean {
    const winningLines = [
        '012', '345', '678', // rows
        '036', '147', '258', // columns
        '048', '246', // diagonals
    ];
    return winningLines.some(line =>
        line.split('').every(i => board[Number(i)] === player)
    );
}
function checkWinner(board: Board): string | null {
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

function average(board: Board, player: string, maxPlayer: boolean, depth: number = 0, maxDepth: number = 5): [number, number] {
    if (isWinningBoard(board, 'o')) {
        console.log('depth:', depth, 'score:', Number.NEGATIVE_INFINITY);
        return [Number.NEGATIVE_INFINITY, null];
    }
    if (isWinningBoard(board, 'x')) {
        console.log('depth:', depth, 'score:', Number.POSITIVE_INFINITY);
        return [Number.POSITIVE_INFINITY, null];
    }
    if (isTieBoard(board)) {
        console.log('depth:', depth, 'score:', 0);
        return [0, null];
    }
    if (depth >= maxDepth) {
        console.log('depth:', depth, 'score:', 0);
        return [0, null];
    }
    const nextPlayer = player === 'x' ? 'o' : 'x';
    const validMoves = getValidMoves(board);
    if (maxPlayer) {
        let bestScore = Number.NEGATIVE_INFINITY;
        let bestMove: number;
        for (const move of validMoves) {
            const [score, _] = average(
                board.substr(0, move) + 'o' + board.substr(move + 1),
                nextPlayer, false, depth + 1, maxDepth
            );
            console.log('depth:', depth, 'score:', score);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return [bestScore, bestMove];
    } else {
        let bestScore = Number.POSITIVE_INFINITY;
        let bestMove: number;
        for (const move of validMoves) {
            const [score, _] = average(
                board.substr(0, move) + 'x' + board.substr(move + 1),
                nextPlayer, true, depth + 1, maxDepth
            );
            console.log('depth:', depth, 'score:', score);
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return [bestScore, bestMove];
    }
}
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Tic tac toe game')
});

app.get('/play', (req: Request, res: Response) => {
    const board = req.query.board as Board;
    console.log(`board: ${board}`);

    if (!/^[x\-o]{9}$/.test(board) || !isMovePossible(board)) {
        return res.sendStatus(400);
    }
    const [_, move] = average(board, 'x', true);
    const newBoard = board.substr(0, move) + 'o' + board.substr(move + 1);
    res.send(newBoard);
});
app.get('/winner', (req: Request, res: Response) => {
  const board = req.query.board as Board;
  console.log(`board: ${board}`);
  
  if (!/^[x\-o]{9}$/.test(board)) {
    return res.sendStatus(400);
  }
  
  const winner = checkWinner(board);
  res.json({ winner });
});
app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`);
});
