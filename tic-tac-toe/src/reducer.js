import * as _ from 'lodash';
import { createBoard, hasWon, isFull, minimax, emptyCells } from './board';

const createDefaultState = () => ({
  field: createBoard(3),
  symbol: undefined,
  didEnd: false
})

const makeCpuTurn = (state) => {
  // since makeCpuTurn is called unconditionally
    if (state.didEnd) {
      return state;
    }

    // cpu turn
    const copy = _.cloneDeep(state.field);
    const move = minimax(copy, 'O');
    copy[move.y][move.x] = 'O';
    const cpuDidWin = hasWon(copy, 'O');

    return {
      field: copy,
      symbol: 'X',
      didEnd: cpuDidWin,
      isDraw: !cpuDidWin && isFull(copy)
    };
}

const turn = (state, action) => {
  if (state.field[action.row][action.col] !== undefined || state.didEnd) {
        return state;
      }
      const copy = _.cloneDeep(state.field);
      copy[action.row][action.col] = state.symbol;
      const playerDidWin = hasWon(copy, state.symbol);

      return {
        field: copy,
        symbol: 'O',
        didEnd: playerDidWin || emptyCells(copy).length === 0,
        isDraw: !playerDidWin && isFull(copy)
      };
}

export const app = (state = createDefaultState(), action) => {
  switch (action.type) {
    case 'SET_PLAYER':
      if (action.player === 'O') {
        return makeCpuTurn(state);
      }
      return {
        field: state.field,
        symbol: 'X',
        didEnd: false,
        isDraw: false
      }
    case 'TURN_CPU':
      return makeCpuTurn(state);
    case 'TURN':
      return turn(state, action);
    case 'RESET':
      return createDefaultState();
    default:
      return state;
  }
}

export default app;
