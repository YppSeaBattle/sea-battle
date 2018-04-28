import React, { Component } from 'react';
import SeaBattle from './components/sea-battle/sea-battle.jsx';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SeaBattle />
      </div>
    );
  }
}

export default App;
