import { turn } from './actions';
import app, { isOccuppiedAt  } from './reducer';
import {
  createField,
  transpose,
  horizontal,
  vertical,
  diagonal,
  emptyCells
} from './board';

test('transpose', () => {
  const m = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  const expectation = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
  ];
  expect(transpose(m), expectation);
});

test('horizontal', () => {
  expect(
    horizontal(
      [
        ['o', 'x', 'o'],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ], 'o')
  ).toBeFalsy();
  expect(
    horizontal(
      [
        ['o', 'o', 'o'],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ],
      'o'
    )
  ).toBeTruthy();
});


test('vertical', () => {
  expect(
    vertical(
      [
        ['o', '', ''],
        ['x', '', ''],
        ['o', '', '']
      ],
      'o'
    )
  ).toBeFalsy();
  expect(
    vertical(
      [
        ['o', '', ''],
        ['o', '', ''],
        ['o', '', '']
      ],
      'o'
    )
  ).toBeTruthy();
});

test('diagonal', () => {
  expect(
    diagonal(
      [
        ['o', '', ''],
        ['x', '', ''],
        ['o', '', '']
      ],
      'o'
    )
  ).toBeFalsy();
  expect(
    diagonal(
      [
        ['o', '', ''],
        ['', 'o', ''],
        ['', '', 'o']
      ],
      'o'
    )
  ).toBeTruthy();
  expect(
    diagonal(
      [
        ['', '', 'o'],
        ['', 'o', ''],
        ['o', '', '']
      ],
      'o'
    )
  ).toBeTruthy();
});

test("empty cells", () => {
    const board = [
      ['x', undefined, undefined],
      ['x', 'o', undefined],
      ['o', 'x', 'x']
    ];
    const empty = emptyCells(board);
    expect(empty).toContainEqual({x: 1, y: 0, symbol: undefined});
    // expect(empty).toContain({x: 2, y: 0});
    // expect(empty).toContain({x: 2, y: 1});
});
