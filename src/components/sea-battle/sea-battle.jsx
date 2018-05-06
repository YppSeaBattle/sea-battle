import React, { Component } from 'react';
import Damage from '../damage/damage.jsx';
import Ship from '../ship/ship.jsx';
import { cbDmg, ships, sizeClasses } from '../../resources/constants';
import './sea-battle.css';

class SeaBattle extends Component {
  constructor(props) {
    super(props);
    const shipA = require(`../../resources/ships/sloop.json`);
    const shipB = require(`../../resources/ships/sloop.json`);
    console.log(cbDmg);
    this.state = {
      shipA: {
        ...shipA,
        currentDmg: 0
      },
      shipB: {
        ...shipB,
        currentDmg: 0
      }
    };
  }

  render() {
    return (
      <div className="battle">
        <div className="ships-and-damage">
          <Ship {...this.state.shipA}/>
          <Damage cbDmgA={this.cbDmgA.bind(this)} cbDmgB={this.cbDmgB.bind(this)}/>
          <Ship {...this.state.shipB}/>
        </div>
        <div>
          <button onClick={this.resetDmg.bind(this)}>Reset</button>
        </div>
      </div>
    )
  }

  cbDmgA() {
    const cbSize = this.state.shipB.cbSize;
    this.setState({
      shipA: {
        ...this.state.shipA,
        currentDmg: this.state.shipA.currentDmg + cbDmg[cbSize]
      }
    });
  }
  
  cbDmgB() {
    const cbSize = this.state.shipA.cbSize;
    this.setState({
      shipB: {
        ...this.state.shipB,
        currentDmg: this.state.shipB.currentDmg + cbDmg[cbSize]
      }
    });
  }

  resetDmg() {
    this.setState({
      shipA: {
        ...this.state.shipA,
        currentDmg: 0
      },
      shipB: {
        ...this.state.shipB,
        currentDmg: 0
      }
    })
  }
}

export default SeaBattle;
