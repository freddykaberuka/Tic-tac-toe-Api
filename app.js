"use strict";
exports.__esModule = true;
var express = require('express');
var gameUtils_1 = require("./helpers/gameUtils");
var gameController_1 = require("./helpers/gameController");
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Tic tac toe game');
});
app.get('/play', function (req, res) {
    var board = req.query.board;
    console.log("board: ".concat(board));
    if (!/^[x\-o]{9}$/.test(board) || !(0, gameController_1.isMovePossible)(board)) {
        return res.sendStatus(400);
    }
    var _a = (0, gameUtils_1.average)(board, 'x', true), _ = _a[0], move = _a[1];
    var newBoard = board.substr(0, move) + 'o' + board.substr(move + 1);
    res.send(newBoard);
});
app.get('/winner', function (req, res) {
    var board = req.query.board;
    console.log("board: ".concat(board));
    if (!/^[x\-o]{9}$/.test(board)) {
        return res.sendStatus(400);
    }
    var winner = (0, gameController_1.checkWinner)(board);
    res.json({ winner: winner });
    console.log(winner);
});
app.listen(port, function () {
    console.log("server is listening at http://localhost:".concat(port));
});
