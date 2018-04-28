import React, { Component } from 'react';
import './ship.css';

class Ship extends Component {
  constructor(props) {
    super(props);
    this.config = require(`../../resources/ships/${this.props.shipType}.json`);
    this.state = {
      name: this.config.name,
      currentDmg: 0,
      cbSize: this.config.cbSize,
      sizeClass: this.config.sizeClass,
      ramDmg: this.config.ramDmg,
      maxSFDmg: this.config.maxSFDmg,
      maxDmg: this.config.maxDmg
    }
  } 

  render() {
    return(
      <div className="ship">I'm a {this.state.name}</div>
    );
  }
}

export default Ship;
