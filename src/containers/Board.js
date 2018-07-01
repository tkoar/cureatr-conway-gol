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
    this.setState({board: this.makeBoardMatrix()}, () => this.startInterval())
  }

  startInterval = () => {
    this.setState({interval: setInterval(() => this.checkBoard(), 1000)})
  }

  stopInterval = () => {
    clearInterval(this.state.interval)
    this.setState({interval: null})
  }

  checkTop(x, y) {
    if (this.state.board[x-1] && this.state.board[x-1][y]) {
      return this.state.board[x-1][y]
    }
    return false
  }

  checkBottom(x, y) {
    if (this.state.board[x+1] && this.state.board[x+1][y]) {
      return this.state.board[x+1][y]
    }
    return false
  }

  checkRight(x, y) {
    if (this.state.board[x] && this.state.board[x][y+1]) {
      return this.state.board[x][y+1]
    }
    return false
  }

  checkLeft(x, y) {
    if (this.state.board[x] && this.state.board[x][y-1]) {
      return this.state.board[x][y-1]
    }
    return false
  }

  checkTopRight(x, y) {
    if (this.state.board[x-1] && this.state.board[x-1][y+1]) {
      return this.state.board[x-1][y+1]
    }
    return false
  }

  checkTopLeft(x, y) {
    if (this.state.board[x-1] && this.state.board[x-1][y-1]) {
      return this.state.board[x-1][y-1]
    }
    return false
  }

  checkBottomRight(x, y) {
    if (this.state.board[x+1] && this.state.board[x+1][y+1]) {
      return this.state.board[x+1][y+1]
    }
    return false
  }

  checkBottomLeft(x, y) {
    if (this.state.board[x+1] && this.state.board[x+1][y-1]) {
      return this.state.board[x+1][y-1]
    }
    return false
  }

  checkEdges(x, y, count) {
    count = this.checkTop(x, y) ? count + 1 : count + 0
    count = this.checkBottom(x, y) ? count + 1 : count + 0
    count = this.checkRight(x, y) ? count + 1 : count + 0
    count = this.checkLeft(x, y) ? count + 1 : count + 0
    count = this.checkTopRight(x, y) ? count + 1 : count + 0
    count = this.checkTopLeft(x, y) ? count + 1 : count + 0
    count = this.checkBottomRight(x, y) ? count + 1 : count + 0
    count = this.checkBottomLeft(x, y) ? count + 1 : count + 0
    return count
  }

  populatedOrEmpty = (count) => {
    // Any populated cell with fewer than two neighbors becomes empty
    // Any populated cell with two or three neighbors stays populated
    // Any populated cell with more than three neighbors becomes empty
    // Any empty cell with exactly three or six neighbors becomes populated
    const rule_dictionary = {
      '0': false,
      '1': false,
      '2': true,
      '3': true,
      '4': false,
      '5': false,
      '6': false,
      '7': false,
      '8': false,
    }
    return rule_dictionary[`${count}`]
  }

  checkBoard() {
    let new_board = [...this.state.board]
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        let count = this.checkEdges(i, j, 0)
        if (new_board[i][j]) {
          new_board[i][j] = this.populatedOrEmpty(count)
        } else if (count == 3 || count == 6) {
          new_board[i][j] = true
        }
      }
    }
    this.setState({board: new_board})
  }

  render() {
    console.log(this.state.board)
    return(
      <div style={{'float': 'left'}}>
        {this.state.board}
      </div>
    )
  }

}
