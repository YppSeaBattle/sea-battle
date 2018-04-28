import React, { Component } from 'react';
import Ship from '../ship/ship.jsx';
import './sea-battle.css';

class SeaBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipA: 'sloop',
      shipB: 'sloop'
    };
  }

  render() {
    return (
      <div className="battle">
        <Ship shipType={this.state.shipA}/>
        <Ship shipType={this.state.shipB}/>
      </div>
    )
  }
}

export default SeaBattle;
