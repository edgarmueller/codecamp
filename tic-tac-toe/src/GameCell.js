import React, { Component } from 'react';
import { connect } from 'react-redux';
import { turn , cpuTurn } from './actions';

export class GameCell extends Component {
  render() {
    const { symbol, rowIndex, colIndex, makeTurn, makeCpuTurn, isStart } = this.props;

    if (isStart) {
      return (<div className='game-slot'>_</div>);
    } else {
      return (
        <div
          className='game-slot'
          onClick={() => {
            if (symbol === undefined) {
              makeTurn(rowIndex, colIndex);
              makeCpuTurn();
            } else {
              console.log("already occuppied!")
            }
          }}
        >
          {symbol ? symbol : '_' }
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  symbol: state.field[ownProps.rowIndex][ownProps.colIndex],
  isStart: state.symbol === undefined
})

const mapDispatchToProps = dispatch => ({
  makeTurn(row, col) {
    dispatch(turn(row, col))
  },
  makeCpuTurn() {
    dispatch(cpuTurn())
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameCell);
