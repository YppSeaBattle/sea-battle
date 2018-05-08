import React, { Component } from 'react';
import { cbDmg } from '../../resources/constants';
import './ship.css';

class Ship extends Component {
  render() {
    return(
      <div className="ship">
        <div>I'm a {this.props.name}</div>
        <div>Dmg: {this.scaleDmg(this.props.currentDmg)}/{this.scaleDmg(this.props.maxSFDmg)}</div>
      </div>
    );
  }

  scaleDmg(dmg) {
    const newDmg = dmg/cbDmg[this.props.enemyCbSize];
    return Math.round(newDmg * 100) / 100;
  }
}

export default Ship;
