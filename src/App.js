import React, { Component } from 'react';
import './App.css';
import web3 from './web3.js';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: 'For entertainment purposes only ;)'
  };
  
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    
    this.setState({ manager, players, balance });
  }
  
  onSubmit = async (event) => {
    event.preventDefault();
    
    const accounts = await web3.eth.getAccounts();
    
    this.setState({ message: 'Muhaha... er, waiting for transaction success...' });
    
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    
    this.setState({ message: 'Your entry has been accepted!' });
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
          <p>Prize Pool: {web3.utils.fromWei(this.state.balance, 'ether')} ETH</p>           
        </div>
        <hr/>
        <form onSubmit={this.onSubmit} className="entry">
          <h4>Want to try your luck?</h4>
          <div className="form-group">
            <label>Amount of ether (ETH) to enter: </label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
              className="form-group-item"
            />
            <button>Enter</button>
          </div>
        </form>
        <hr/>
        <h2 className="message">{this.state.message}</h2>
              
      </div>
    );
  }
}

export default App;
