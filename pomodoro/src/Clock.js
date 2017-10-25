import React, { Component } from 'react';

const COUNTDOWN_DEFAULT = 25;
const PAUSE_DEFAULT = 5;

export class Clock extends Component {

  constructor(props) {
    super(props);
    this.reset.bind(this);
  }

  componentWillMount() {
    this.reset();
  }

  reset() {
    const { countdown, pause } = this.props;
    const workInterval = (countdown || COUNTDOWN_DEFAULT);
    const pauseInterval = (pause || PAUSE_DEFAULT);
    this.setState(() => ({
      workInterval,
      pauseInterval,
      remaining:  workInterval,
      doWork: true,
      paused: true
    }));
  }

  componentDidMount() {
      setInterval(
        () => {
          if (this.state.paused) {
            return;
          }
          this.setState(s => {
            if (s.remaining === 0) {
              return {
                remaining: s.doWork ? s.pauseInterval : s.workInterval,
                doWork: !s.doWork
              }
            } else {
              return {
                doWork: s.doWork,
                remaining: s.remaining - 1,
              }
            }
          });
        },
        1000
      );
  }

  render() {
    const { countdown, pause } = this.props;

    return (
      <div>
        <label htmlFor='workInterval'>work session</label>
        <input id='workInterval'
               value={this.state.workInterval}
               type='number'
               min='1'
               onChange={ev => this.setState({
                 workInterval: ev.target.value
               })}
        />
        <label htmlFor='pauseInterval'>
          chill length
        </label>
        <input id='pauseInterval'
               value={this.state.pauseInterval}
               type='number'
               min='1'
               onChange={ev => this.setState({
                 pauseInterval: ev.target.value
               })}
        />
        <h1>{this.state.doWork ? 'work it!' : 'chill'}</h1>
        <h2>{this.state.remaining}</h2>
        <button onClick={() =>
          this.setState(s =>
            ({
              doWork: s.doWork,
              remaining: s.remaining,
              paused: !s.paused
            })
          )
        }>
          {
            this.state.paused ? 'go go': 'Make a break'
          }
        </button>
        <button onClick={() => this.reset() }>reset it all!</button>
      </div>
    );
  }
}
