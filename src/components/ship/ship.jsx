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
    return dmg/cbDmg[this.props.enemyCbSize];
  }
}

export default Ship;
