import React, { Component } from 'react';
import Cell from '../components/Cell'

export default class Board extends Component {

  state = {
    board: [[]]
  }

  makeCells() {
    let num_cells_to_fill = Math.round(Math.random() * (13-12) + 12)
    let cells_to_fill = []
    for (let i = 0; i < num_cells_to_fill; i++) {
      let rand_num = Math.round(Math.random() * 50)
      if (!cells_to_fill.includes(rand_num)) {
        cells_to_fill.push(rand_num)
      }
    }
    let cells_array = Array(50).fill(false)
    return cells_array.map((cell, idx) => {
      if (cells_to_fill.includes(idx))
        cell = true
      return cell
    })
  }

  makeRows() {
    let new_array = []
    for (let i = 0; i < 50; i ++) {
      new_array.push(this.makeCells())
    }
    return new_array
  }

  makeBoardMatrix = () => this.makeRows()

  componentDidMount() {
    this.setState({board: this.makeBoardMatrix()})
  }

  render() {
    console.log(this.state.board);
    return(
      <div style={{'float': 'left'}}>
        {this.state.board}
      </div>
    )
  }

}
