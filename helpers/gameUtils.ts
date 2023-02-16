import { isWinningBoard, isTieBoard, getValidMoves } from './boardUtils';

type Board = string;

export const average = (
  board: Board,
  player: string,
  maxPlayer: boolean,
  depth: number = 0,
  maxDepth: number = 5
): [number, number] => {
  if (isWinningBoard(board, "o")) {
    console.log("depth:", depth, "score:", Number.NEGATIVE_INFINITY);
    return [Number.NEGATIVE_INFINITY, null];
  }
  if (isWinningBoard(board, "x")) {
    console.log("depth:", depth, "score:", Number.POSITIVE_INFINITY);
    return [Number.POSITIVE_INFINITY, null];
  }
  if (isTieBoard(board)) {
    console.log("depth:", depth, "score:", 0);
    return [0, null];
  }
  if (depth >= maxDepth) {
    console.log("depth:", depth, "score:", 0);
    return [0, null];
  }
  const nextPlayer = player === "x" ? "o" : "x";
  const validMoves = getValidMoves(board);
  if (maxPlayer) {
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestMove: number;
    for (const move of validMoves) {
      const [score, _] = average(
        board.substr(0, move) + "o" + board.substr(move + 1),
        nextPlayer,
        false,
        depth + 1,
        maxDepth
      );
      console.log("depth:", depth, "score:", score);
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
        board.substr(0, move) + "x" + board.substr(move + 1),
        nextPlayer,
        true,
        depth + 1,
        maxDepth
      );
      console.log("depth:", depth, "score:", score);
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return [bestScore, bestMove];
  }
}
