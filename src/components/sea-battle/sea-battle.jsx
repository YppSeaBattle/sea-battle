import React, { Component } from 'react';
import { SelectField } from 'react-md';
import Damage from '../damage/damage.jsx';
import Ship from '../ship/ship.jsx';
import { cbDmg, ships } from '../../resources/constants';
import { scaleDmg } from '../../utils';
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
    this.stateHistory = [this.state];
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
            cbHitA={this.cbHit.bind(this, 'shipA', 'shipB')} 
            cbHitB={this.cbHit.bind(this, 'shipB', 'shipA')}
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
          <button onClick={this.undo.bind(this)}>Undo</button>
          <button onClick={this.resetDmg.bind(this)}>Reset</button>
          <button onClick={this.copyScore.bind(this)}>Score</button>
        </div>
      </div>
    )
  }

  copyScore() {
    const cbSizeA = this.state.shipA.cbSize;
    const cbSizeB = this.state.shipB.cbSize;
    const score = `[Hits Sustained] <Us> 
      ${scaleDmg(this.state.shipA.currentDmg, cbSizeB)}/${scaleDmg(this.state.shipA.maxSFDmg, cbSizeB)} : 
      ${scaleDmg(this.state.shipB.currentDmg, cbSizeA)}/${scaleDmg(this.state.shipB.maxSFDmg, cbSizeA)} <Them>`
    copyToClipboard(score);
  }

  cbHit(yourShip, theirShip) {
    const cbSize = this.state[theirShip].cbSize;
    this.inflictDmg(yourShip, cbDmg[cbSize]);
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
    }, this.pushState.bind(this));
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
    }, this.pushState.bind(this));
  }
  
  onShipSelect(ship, value, index, event, details) {
    const newShip = getShipFilename(value);
    const config = require(`../../resources/ships/${newShip}.json`);
    this.setState({
      [ship]: {
        ...config,
        currentDmg: this.state[ship].currentDmg
      }
    }, this.pushState.bind(this));
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
    }, () => {
      this.stateHistory = [this.state];
    });
  }

  pushState() {
    this.stateHistory.push(this.state);
  }

  undo() {
    if (this.stateHistory.length > 1) this.stateHistory.pop();
    this.setState(this.stateHistory[this.stateHistory.length-1]);
  }
}

function getShipFilename(ship) {
  return ship.toLowerCase().split(' ').join('-');
}

function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export default SeaBattle;
