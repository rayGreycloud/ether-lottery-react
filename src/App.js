import React, { Component } from 'react';
import './App.css';
import web3 from './web3.js';
import lottery from './lottery';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { manager: '' };
  }
  
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    
    this.setState({ manager });
  }
  
  render() {  
    return (
      <div className="App App-header">
        <h2 className="App-title">Lottery Contract</h2>
        <p className="App-intro">This contract is managed by: </p><p>{this.state.manager}</p>
      </div>
    );
  }
}

export default App;
