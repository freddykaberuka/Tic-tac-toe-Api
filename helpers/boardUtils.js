"use strict";
exports.__esModule = true;
exports.checkWinner = exports.isWinningBoard = exports.isTieBoard = exports.getValidMoves = exports.isMovePossible = void 0;
var isMovePossible = function (board) {
    var xCount = board.split('x').length - 1;
    var oCount = board.split('o').length - 1;
    return xCount === oCount || xCount === oCount + 1;
};
exports.isMovePossible = isMovePossible;
function getValidMoves(board) {
    var moves = board.split('').reduce(function (moves, cell, i) {
        return cell === '-' ? moves.concat(i) : moves;
    }, []);
    console.log('valid moves:', moves);
    return moves;
}
exports.getValidMoves = getValidMoves;
function isTieBoard(board) {
    return !board.includes('-');
}
exports.isTieBoard = isTieBoard;
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
exports.isWinningBoard = isWinningBoard;
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
exports.checkWinner = checkWinner;
