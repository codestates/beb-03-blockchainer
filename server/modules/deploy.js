const Web3 = require("web3");
const web3 = new Web3(
  `https://ropsten.infura.io/v3/${process.env.INFURA_ADDRESS}`
);

function deploy(contract, data, parameter) {
  contract
    .deploy({ data: data })
    .send(parameter)
    .on("receipt", (receipt) => {
      console.log(`contract address : ${receipt.contractAddress}`);
      console.log(`Tx hash : ${receipt.transactionHash}`);
    });
}

module.exports = deploy;
