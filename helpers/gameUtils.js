"use strict";
exports.__esModule = true;
exports.average = void 0;
var boardUtils_1 = require("./boardUtils");
function average(board, player, maxPlayer, depth, maxDepth) {
    if (depth === void 0) { depth = 0; }
    if (maxDepth === void 0) { maxDepth = 5; }
    if ((0, boardUtils_1.isWinningBoard)(board, "o")) {
        console.log("depth:", depth, "score:", Number.NEGATIVE_INFINITY);
        return [Number.NEGATIVE_INFINITY, null];
    }
    if ((0, boardUtils_1.isWinningBoard)(board, "x")) {
        console.log("depth:", depth, "score:", Number.POSITIVE_INFINITY);
        return [Number.POSITIVE_INFINITY, null];
    }
    if ((0, boardUtils_1.isTieBoard)(board)) {
        console.log("depth:", depth, "score:", 0);
        return [0, null];
    }
    if (depth >= maxDepth) {
        console.log("depth:", depth, "score:", 0);
        return [0, null];
    }
    var nextPlayer = player === "x" ? "o" : "x";
    var validMoves = (0, boardUtils_1.getValidMoves)(board);
    if (maxPlayer) {
        var bestScore = Number.NEGATIVE_INFINITY;
        var bestMove = void 0;
        for (var _i = 0, validMoves_1 = validMoves; _i < validMoves_1.length; _i++) {
            var move = validMoves_1[_i];
            var _a = average(board.substr(0, move) + "o" + board.substr(move + 1), nextPlayer, false, depth + 1, maxDepth), score = _a[0], _ = _a[1];
            console.log("depth:", depth, "score:", score);
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
            var _c = average(board.substr(0, move) + "x" + board.substr(move + 1), nextPlayer, true, depth + 1, maxDepth), score = _c[0], _ = _c[1];
            console.log("depth:", depth, "score:", score);
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return [bestScore, bestMove];
    }
}
exports.average = average;
