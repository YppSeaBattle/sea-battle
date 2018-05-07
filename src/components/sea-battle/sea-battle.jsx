import React, { Component } from 'react';
import { SelectField } from 'react-md';
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
          <div className="ship-and-selector">
            <SelectField
              id="ship-a-select"
              defaultValue={'Sloop'}
              menuItems={ships}
              onChange={this.onShipSelect.bind(this, 'shipA')}
            />
            <Ship {...this.state.shipA}/>
          </div>
          <Damage cbDmgA={this.cbDmgA.bind(this)} cbDmgB={this.cbDmgB.bind(this)}/>
          <div className="ship-and-selector">
            <SelectField
              id="ship-b-select"
              defaultValue={'Sloop'}
              menuItems={ships}
              onChange={this.onShipSelect.bind(this, 'shipB')}
            />
            <Ship {...this.state.shipB}/>
          </div>
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

  onShipSelect(ship, value, index, event, details) {
    const newShip = getShipFilename(value);
    const config = require(`../../resources/ships/${newShip}.json`);
    this.setState({
      [ship]: {
        ...config,
        currentDmg: this.state[ship].currentDmg
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

function getShipFilename(ship) {
  return ship.toLowerCase().split(' ').join('-');
}

export default SeaBattle;
