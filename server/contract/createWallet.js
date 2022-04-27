const { ethers } = require('ethers');
const createWallet = async () => {
  const wallet = ethers.Wallet.createRandom();

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

module.exports = createWallet;
