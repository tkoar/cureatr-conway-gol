import React, { Component } from 'react';
import Board from './containers/Board'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Board {...this.state} press_play={this.press_play} press_pause={this.press_pause} press_reset={this.press_reset}/>
      </div>
    );
  }
}

export default App;
