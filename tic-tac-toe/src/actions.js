export const turn = ( row, col) => ({
  type: 'TURN',
  row,
  col
});

export const resetField = () => ({
  type: 'RESET'
});
