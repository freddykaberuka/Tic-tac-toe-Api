const express = require('express')
import type { Request, Response } from 'express';
import { average } from './helpers/gameUtils';
import { isMovePossible, checkWinner } from './helpers/gameController'

type Board = string;


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
    console.log(winner);

});
app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`);
});
