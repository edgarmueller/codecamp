import { turn } from './actions';
import app from './reducer';
import { isOccuppiedAt  } from './reducer';
import { createBoard, transpose, horizontal, vertical, diagonal } from './board';

test('make a turn', () => {
  const newState = app(undefined, turn(0, 0));
  expect(newState.field[0][0] === 'x');
  expect(isOccuppiedAt(0, 0)(newState.field), true);
});

test("no turn after game has ended", () => {
  const initState = { didEnd: true, field: createBoard() };
  const newState = app(initState, turn(0, 0));
  expect(newState.field).toEqual(initState.field);
});
