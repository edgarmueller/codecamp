import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { GameField } from './GameField';
import { resetField } from './actions';

class App extends Component {
  render() {
    const { field, player, didEnd, draw, reset } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        { player }
        <GameField field={field} />
        {
          draw ?
            <p>Draw!</p> :
            didEnd && <p>{player} has won!</p>
        }
        { didEnd && <button onClick={reset}>Reset</button> }
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  field: state.field,
  player: state.symbol === 'X' ? 'Player 1' : 'Player 2',
  didEnd: state.didEnd || state.isDraw,
  draw: state.isDraw
});

export const mapDispatchToProps = dispatch => ({
  reset() {
    dispatch(resetField())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
