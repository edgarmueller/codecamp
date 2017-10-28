import { createField, hasWon, isFull } from './field';

const createDefaultState = () => ({
  field: createField(3),
  symbol: 'X',
  didEnd: false
})

export const app = (state = createDefaultState(), action) => {
  switch (action.type) {
    case 'TURN':
      if (state.field[action.row][action.col] !== undefined || state.didEnd) {
        return state;
      }
      const copy = state.field.slice();
      copy[action.row][action.col] = state.symbol;
      const playerDidWin = hasWon(copy, state.symbol);

      return {
        field: copy,
        symbol: state.symbol === 'X' ? 'O' : 'X',
        didEnd: playerDidWin,
        isDraw: !playerDidWin && isFull(copy)
      };
    case 'RESET':
      return createDefaultState();
    default:
      return state;
  }
}

export const isOccuppiedAt = (row, col) => state =>
  state[row][col] !== undefined;

export default app;
