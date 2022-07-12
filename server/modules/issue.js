const Web3 = require("web3");
const web3 = new Web3(
  `https://ropsten.infura.io/v3/${process.env.INFURA_ADDRESS}`
);

const erc20abi = require("../../contracts/erc20abi");
const server = web3.eth.accounts.wallet.add(process.env.SERVER_SECRET);
const erc20Contract = new web3.eth.Contract(
  erc20abi,
  process.env.ERC20_CONTRACT,
  {
    from: process.env.SERVER_ADDRESS,
  }
);

function issueToken(receipt, value) {
  erc20Contract.methods
    .mintToken(receipt.address, web3.utils.toBN(value * 10 ** 18))
    .send({
      from: server.address,
      to: process.env.ERC20_CONTRACT,
      gasPrice: 100,
      gas: 2000000,
    });
}

module.exports = issueToken;
