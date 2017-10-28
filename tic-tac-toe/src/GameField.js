import React, { Component } from 'react';
import GameRow from './GameRow';

export class GameField extends Component {

  render() {
    const { field } = this.props;

    return (
      <div className='game-field'>
          {
            field.map((row, index) => (
              <GameRow key={index} row={row} rowIndex={index} />)
            )
          }
      </div>
    )
  }
}
