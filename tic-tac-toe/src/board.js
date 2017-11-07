import * as _ from 'lodash';

export const createBoard = (height) => {
  const rows = height || 3;
  const columns = height || 3;
  const square = [];
  for (let x = 0; x < rows; x++) {
    const row = [];
    for (let y = 0; y < columns; y++) {
      row.push(undefined);
    }
    square.push(row);
  }
  return square;
}

export const isFull = (field) =>
  _.every(_.flatten(field), cell => cell !== undefined)

export const hasWon = (board, symbol) =>
  horizontal(board, symbol)
    || vertical(board, symbol)
    || diagonal(board, symbol);

export const horizontal = (board, symbol) =>
  _.some(board, row => _.every(row, cell => cell === symbol))

export const vertical = (board, symbol) => {
  const v = horizontal(transpose(board), symbol)
  transpose(board)
  return v;
}

export const diagonal = (board, symbol) =>
  topLeftToBottomRight(board, symbol) || topRightToBottomLeft(board, symbol)

export const topLeftToBottomRight = (board, symbol) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][i] !== symbol) {
      return false;
    }
  }

  return true;
}

export const topRightToBottomLeft = (board, symbol) => {
  const cols = board[0].length;
  let row = 0;
  for (let i = cols - 1; i >= 0; i--) {
    if (board[row][i] !== symbol) {
      return false;
    }
    row += 1;
  }

  return true;
}

export const transpose = (matrix) => {
  const m = matrix;
  for (let i = 0; i < m.length; i++) {
    for (let j = i; j < m[0].length; j++) {
      const t = m[i][j];
      m[i][j] = m[j][i];
      m[j][i] = t;
    }
  }

  return m;
}

export const emptyCells = (board) => {
  const cells = board.map((row, rowIndex) => {
      return row.map((symbol, colIndex) => ({
        x: colIndex,
        y: rowIndex,
        symbol
      }))
    });

  return _.flatten(cells).filter(cell => cell.symbol === undefined);
}

export const minimax = (newBoard, player) => {
  const availableCells = emptyCells(newBoard);

  // checks for the terminal states such as win, lose, and tie
  // and returning a value accordingly
  if (hasWon(newBoard, 'X')) {
    return { score: -10 };
  } else if (hasWon(newBoard, 'O')) {
    return { score: 10 };
  } else if (availableCells.length === 0) {
    return { score: 0 };
  }

  const moves = availableCells.map(cell => {
    const move = {
      x: cell.x,
      y: cell.y
    };

    const copy = newBoard;
    const original = copy[cell.y][cell.x];

    // stop search in order to given humans a chance to win
    if (Math.random() * 10 < 0.5) {
      move.score = 10;
      return move;
    }

    copy[cell.y][cell.x] = player;
    const score = minimax(copy, player === 'O' ? 'X' : 'O')
    copy[cell.y][cell.x] = original;
    move.score = score.score;
    return move;
  });

  const shuffledMoves = _.shuffle(moves);
  return player === 'O' ?
    _.maxBy(shuffledMoves, move => move.score) :
    _.minBy(shuffledMoves, move => move.score);
}
