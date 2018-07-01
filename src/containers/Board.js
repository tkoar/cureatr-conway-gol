import React, { Component } from 'react';
import Cell from '../components/Cell'

export default class Board extends Component {

  state = {
    board: [[]]
  }

  makeCells() {
    return Array(50).fill(<Cell filled={false}/>)
  }

  makeRows() {
    let new_array = []
    for (let i = 0; i < 50; i ++) {
      new_array.push(<div className='row'>{this.makeCells()}</div>)
    }
    return new_array
  }

  makeBoard = () => this.makeRows()

  componentDidMount() {
    this.setState({board: this.makeBoard()})
  }

  render() {
    return(
      <div style={{'float': 'left'}}>
        {this.state.board}
      </div>
    )
  }

}
