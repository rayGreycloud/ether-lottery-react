import React, { Component } from 'react';
import './App.css';
import web3 from './web3.js';

class App extends Component {
  render() {
    web3.eth.getAccounts()
      .then(console.log);
    
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Welcome to the Lottery</h1>
        </header>
        <p className="App-intro">
          To get started, you must have the Metamask Chrome extension installed.
        </p>
      </div>
    );
  }
}

export default App;
