const { ethers } = require('ethers');

const url = 'http://127.0.0.1:7545';
const provider = new ethers.providers.JsonRpcProvider(url);

module.exports = provider;
