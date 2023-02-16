"use strict";
exports.__esModule = true;
var express = require('express');
var isMovePossible = function (board) {
    var xCount = board.split('x').length - 1;
    var oCount = board.split('o').length - 1;
    return xCount === oCount || xCount === oCount + 1;
};
function getValidMoves(board) {
    var moves = board.split('').reduce(function (moves, cell, i) {
        return cell === '-' ? moves.concat(i) : moves;
    }, []);
    console.log('valid moves:', moves);
    return moves;
}
function isTieBoard(board) {
    return !board.includes('-');
}
function isWinningBoard(board, player) {
    var winningLines = [
        '012', '345', '678',
        '036', '147', '258',
        '048', '246', // diagonals
    ];
    return winningLines.some(function (line) {
        return line.split('').every(function (i) { return board[Number(i)] === player; });
    });
}
function checkWinner(board) {
    var winningLines = [
        '012', '345', '678',
        '036', '147', '258',
        '048', '246', // diagonals
    ];
    for (var _i = 0, winningLines_1 = winningLines; _i < winningLines_1.length; _i++) {
        var line = winningLines_1[_i];
        var _a = line.split('').map(Number), a = _a[0], b = _a[1], c = _a[2];
        if (board[a] !== '-' && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }
    return null;
}
function average(board, player, maxPlayer, depth, maxDepth) {
    if (depth === void 0) { depth = 0; }
    if (maxDepth === void 0) { maxDepth = 5; }
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
    var nextPlayer = player === 'x' ? 'o' : 'x';
    var validMoves = getValidMoves(board);
    if (maxPlayer) {
        var bestScore = Number.NEGATIVE_INFINITY;
        var bestMove = void 0;
        for (var _i = 0, validMoves_1 = validMoves; _i < validMoves_1.length; _i++) {
            var move = validMoves_1[_i];
            var _a = average(board.substr(0, move) + 'o' + board.substr(move + 1), nextPlayer, false, depth + 1, maxDepth), score = _a[0], _ = _a[1];
            console.log('depth:', depth, 'score:', score);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return [bestScore, bestMove];
    }
    else {
        var bestScore = Number.POSITIVE_INFINITY;
        var bestMove = void 0;
        for (var _b = 0, validMoves_2 = validMoves; _b < validMoves_2.length; _b++) {
            var move = validMoves_2[_b];
            var _c = average(board.substr(0, move) + 'x' + board.substr(move + 1), nextPlayer, true, depth + 1, maxDepth), score = _c[0], _ = _c[1];
            console.log('depth:', depth, 'score:', score);
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return [bestScore, bestMove];
    }
}
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Tic tac toe game');
});
app.get('/play', function (req, res) {
    var board = req.query.board;
    console.log("board: ".concat(board));
    if (!/^[x\-o]{9}$/.test(board) || !isMovePossible(board)) {
        return res.sendStatus(400);
    }
    var _a = average(board, 'x', true), _ = _a[0], move = _a[1];
    var newBoard = board.substr(0, move) + 'o' + board.substr(move + 1);
    res.send(newBoard);
});
app.get('/winner', function (req, res) {
    var board = req.query.board;
    console.log("board: ".concat(board));
    if (!/^[x\-o]{9}$/.test(board)) {
        return res.sendStatus(400);
    }
    var winner = checkWinner(board);
    res.json({ winner: winner });
    console.log(winner);
});
app.listen(port, function () {
    console.log("server is listening at http://localhost:".concat(port));
});
