import React, { Component } from 'react';
import './ship.css';

class Ship extends Component {
  render() {
    return(
      <div className="ship">
        <div>I'm a {this.props.name}</div>
        <div>Dmg: {this.props.currentDmg}/{this.props.maxSFDmg}</div>
      </div>
    );
  }
}

export default Ship;
