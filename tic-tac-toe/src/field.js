import * as _ from 'lodash';

export const createField = (height) => {
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

export const hasWon = (field, symbol) =>
  horizontal(field, symbol)
    || vertical(field, symbol)
    || diagonal(field, symbol);

export const horizontal = (field, symbol) =>
  _.some(field, row => _.every(row, cell => cell === symbol))

export const vertical = (field, symbol) =>
  horizontal(transpose(_.cloneDeep(field)), symbol)

export const diagonal = (field, symbol) =>
  topLeftToBottomRight(field, symbol) || topRightToBottomLeft(field, symbol)

export const topLeftToBottomRight = (field, symbol) => {
  for (let i = 0; i < field.length; i++) {
    if (field[i][i] !== symbol) {
      return false;
    }
  }

  return true;
}

export const topRightToBottomLeft = (field, symbol) => {
  const cols = field[0].length;
  let row = 0;
  for (let i = cols - 1; i >= 0; i--) {
    if (field[row][i] !== symbol) {
      return false;
    }
    row += 1;
  }

  return true;
}

export const transpose = (matrix) => {
  const m = matrix.slice();
  for (let i = 0; i < m.length; i++) {
    for (let j = i; j < m[0].length; j++) {
      const t = m[i][j];
      m[i][j] = m[j][i];
      m[j][i] = t;
    }
  }

  return m;
}
