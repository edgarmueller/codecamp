import React, { Component } from 'react';
import { connect } from 'react-redux';
import { turn } from './actions';

export class GameCell extends Component {
  render() {
    const { symbol, rowIndex, colIndex, makeTurn } = this.props;
    return (
      <div
        className='game-slot'
        onClick={() => makeTurn(rowIndex, colIndex)}
      >
        {symbol ? symbol : '_' }
      </div>);
  }
}

const mapStateToProps = (state, ownProps) => ({
  symbol: state.field[ownProps.rowIndex][ownProps.colIndex]
})

const mapDispatchToProps = dispatch => ({
  makeTurn(row, col) {
    dispatch(turn(row, col))
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameCell);
