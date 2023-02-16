"use strict";
exports.__esModule = true;
var express = require('express');
var isMovePossible = function (board) {
    var xCount = board.split('x').length - 1;
    var oCount = board.split('o').length - 1;
    return xCount === oCount || xCount === oCount + 1;
};
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Tic tac toe game');
});
app.get('/play', function (req, res) {
    var board = req.query.board;
    console.log("Board: ".concat(Board));
    if (!/^[x\-o]{9}$/.test(board) || !isMovePossible(board)) {
        return res.sendStatus(400);
    }
});
app.listen(port, function () {
    console.log("server is listening at http://localhost:".concat(port));
});
