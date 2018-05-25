import React, { Component } from 'react';
import { scaleDmg } from '../../utils';
import './ship.css';

class Ship extends Component {
  render() {
    return(
      <div className="ship">
        <div>Dmg: {scaleDmg(this.props.currentDmg, this.props.enemyCbSize)}/{scaleDmg(this.props.maxSFDmg, this.props.enemyCbSize)}</div>
      </div>
    );
  }
}

export default Ship;
