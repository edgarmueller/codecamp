import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { GameField } from './GameField';
import { resetField, setPlayer } from './actions';

class App extends Component {
  render() {
    const { field, player, didEnd, isStart, draw, reset, setStartPlayer } = this.props;
    console.log('player', player);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <GameField field={field} />
        {
          draw ?
            <p>Draw!</p> :
            didEnd && <p>{player} has won!</p>
        }
        { didEnd && <button onClick={reset}>Reset</button> }

        {
          isStart &&
            <div>
              <p>Pick who goes first</p>
              <button onClick={() => setStartPlayer('X')}>ME!</button>
              <button onClick={() => setStartPlayer('O')}>The OP CPU</button>
            </div>
        }
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  field: state.field,
  player: state.symbol === 'X' ? 'CPU' : 'Hooman',
  didEnd: state.didEnd || state.isDraw,
  isStart: state.symbol === undefined,
  draw: state.isDraw
});

export const mapDispatchToProps = dispatch => ({
  reset() {
    dispatch(resetField())
  },
  setStartPlayer(player) {
    dispatch(setPlayer(player))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
