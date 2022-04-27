const { ehters } = require('ethers');
const abi = require('./abi');
const provider = require('./provider');
require('dotenv').config();

const CA = process.env.CA;

const balanceOf = async (address) => {
  const contract = new ehters.Contract(CA, abi, provider);
  const amount = await contract.balanceOf(address);
  const result = amount.toString();
  return result;
};

module.exports = balanceOf;
