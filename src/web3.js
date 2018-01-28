import Web3 from 'web3';

// Create instance of web3 and pass in Metamask provider
const web3 = new Web3(window.web3.currentProvider);

export default web3;
