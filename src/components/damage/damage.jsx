import React, { Component } from 'react';
import './damage.css';

class Damage extends Component {
  render() {
    return (
      <div className="damage-container">
        <div className="ship-damage">
          <button onClick={this.props.cbHitA}>CB</button>
          <button onClick={this.props.rockHitA}>RK</button>
        </div>
        <div className="ram">
          <button onClick={this.props.ram}>RAM</button>
        </div>
        <div className="ship-damage">
          <button onClick={this.props.cbHitB}>CB</button>
          <button onClick={this.props.rockHitB}>RK</button>
        </div>
      </div>
    );
  }
}

export default Damage;
