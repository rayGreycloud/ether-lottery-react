import React, { Component } from 'react';
import './App.css';
import web3 from './web3.js';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: ''
  };
  
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    
    this.setState({ manager, players, balance });
  }
  
  render() {  
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="App-title">Lottery Contract</h2>  
          
        </div>
        <div className="content">
          <p>
            This contract is managed by:<br/> {this.state.manager}
          </p>
          <p>
            There are currently <strong> {this.state.players.length}</strong> player(s) 
          </p>
          <p>Prize Pool: {web3.utils.fromWei(this.state.balance, 'ether')} ether</p>           
        </div>      
      </div>
    );
  }
}

export default App;
