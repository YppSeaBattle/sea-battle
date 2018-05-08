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
            <Ship {...this.state.shipA} enemyCbSize={this.state.shipB.cbSize}/>
          </div>
          <Damage 
            cbHitA={this.cbHit.bind(this, 'shipA')} 
            cbHitB={this.cbHit.bind(this, 'shipB')}
            rockHitA={this.rockHit.bind(this, 'shipA')}
            rockHitB={this.rockHit.bind(this, 'shipB')}
            ram={this.ram.bind(this)}
          />
          <div className="ship-and-selector">
            <SelectField
              id="ship-b-select"
              defaultValue={'Sloop'}
              menuItems={ships}
              onChange={this.onShipSelect.bind(this, 'shipB')}
            />
            <Ship {...this.state.shipB} enemyCbSize={this.state.shipA.cbSize}/>
          </div>
        </div>
        <div>
          <button onClick={this.resetDmg.bind(this)}>Reset</button>
        </div>
      </div>
    )
  }

  cbHit(ship) {
    const cbSize = this.state[ship].cbSize;
    this.inflictDmg(ship, cbDmg[cbSize]);
  }

  ram() {
    const shipARamDmg = this.state.shipA.ramDmg;
    const shipBRamDmg = this.state.shipB.ramDmg;
    this.setState({
      shipA: {
        ...this.state.shipA,
        currentDmg: this.state.shipA.currentDmg + shipBRamDmg
      },
      shipB: {
        ...this.state.shipB,
        currentDmg: this.state.shipB.currentDmg + shipARamDmg
      }
    });
  }

  rockHit(ship) {
    const rockDmg = this.state[ship].rockDmg;
    this.inflictDmg(ship, rockDmg);
  }

  inflictDmg(ship, dmg) {
    this.setState({
      [ship]: {
        ...this.state[ship],
        currentDmg: this.state[ship].currentDmg + dmg
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
