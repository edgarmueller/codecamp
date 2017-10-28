import React, { Component } from 'react';
import GameCell from './GameCell';

export class GameRow extends Component {

  render() {
    const { row, rowIndex } = this.props;

    return (
      <div className='game-row'>
          {
            row.map((slot, index) => {
              return (
                <GameCell
                  key={`slot-${index}`}
                  rowIndex={rowIndex}
                  colIndex={index}
                />
              )
            })
          }
     </div>
    )
  }
}

export default GameRow;
