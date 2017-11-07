export const turn = ( row, col) => ({
  type: 'TURN',
  row,
  col
});

export const cpuTurn = () => ({
  type: 'TURN_CPU'
});

export const resetField = () => ({
  type: 'RESET'
});

export const setPlayer = (player) => ({
  type: 'SET_PLAYER',
  player,
});
