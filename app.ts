const express = require('express')
import type { Request, Response } from 'express';

type Board = string;

const isMovePossible=(board: Board): boolean =>{
  const xCount = board.split('x').length - 1;
  const oCount = board.split('o').length - 1;
  return xCount === oCount || xCount === oCount + 1;
}

const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Tic tac toe game')
});

app.get('/play', (req: Request, res: Response) => {
  const board = req.query.board as Board;
  console.log(`board: ${board}`);
  
  if (!/^[x\-o]{9}$/.test(board) || !isMovePossible(board)) {
    return res.sendStatus(400);
  }
});
app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
});
