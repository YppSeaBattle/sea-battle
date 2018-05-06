import React, { Component } from 'react';
import './damage.css';

class Damage extends Component {
  render() {
    return (
      <div className="damage-container">
        <div className="ship-damage">
          <button onClick={this.props.cbDmgA}>CB</button>
        </div>
        <div className="ship-damage">
          <button onClick={this.props.cbDmgB}>CB</button>
        </div>
      </div>
    );
  }
}

export default Damage;
