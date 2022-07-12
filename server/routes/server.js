require("dotenv").config();
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { User } = require("../models");
const deploy = require("../modules/deploy");

const Web3 = require("web3");
const web3 = new Web3(
  `https://ropsten.infura.io/v3/${process.env.INFURA_ADDRESS}`
);

const erc20abi = require("../../contracts/erc20abi");
const erc20bytecode = require("../../contracts/erc20bytecode");
const erc721abi = require("../../contracts/erc721abi");
const erc721bytecode = require("../../contracts/erc721bytecode");

router.post("/setting", async (req, res) => {
  const serverAccount = await User.findOne({
    where: {
      username: "server",
    },
  });

  if (serverAccount) {
    res.status(400).json({
      message: "setting is already done",
    });
  } else {
    let serverAccount = await User.create({
      username: "server",
      password: crypto
        .createHash("sha512")
        .update(process.env.SERVER_SECRET)
        .digest("base64"),
      email: "server@blockchiner.com",
      address: process.env.SERVER_ADDRESS, // 환경변수로 바꾸기
      privatekey: process.env.SERVER_SECRET, // 환경변수로 바꾸기
      balance: "0",
    });
  }

  const server = web3.eth.accounts.wallet.add(process.env.SERVER_SECRET);
  const tokenContract = new web3.eth.Contract(erc20abi);
  const nftContract = new web3.eth.Contract(erc721abi);
  const parameter = { from: server.address, gas: 3000000 };

  deploy(tokenContract, erc20bytecode, parameter);

  // tokenContract
  //   .deploy({
  //     data: erc20bytecode,
  //   })
  //   .send(parameter)
  //   .on("receipt", async (receipt) => {
  //     console.log(`ERC20 address : ${receipt.contractAddress}`);
  //     console.log(`Tx hash : ${receipt.transactionHash}`);
  //   })
  //   .on("error", (error) => {
  //     console.log(error);
  //   });

  // nftContract
  //   .deploy({ data: erc721bytecode })
  //   .send(parameter)
  //   .on("receipt", async (receipt) => {
  //     console.log(`ERC721 address : ${receipt.contractAddress}`);
  //     console.log(`Tx hash : ${receipt.transactionHash}`);
  //     res.status(201).json({
  //       message: "deploying ERC721 is succeed",
  //       receipt,
  //     });
  //   })
  //   .on("error", (error) => {
  //     console.log(error);
  //     res.status(400).json({ message: "deploying ERC721 is failed" });
  //   });
});

module.exports = router;
