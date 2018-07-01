import React, { Component } from 'react';

const Cell = ({filled}) => {
  return (
    <div className={'cell'} style={filled ? {'backgroundColor': 'white'} : {'backgroundColor': 'black'}}></div>
  )
}

export default Cell
