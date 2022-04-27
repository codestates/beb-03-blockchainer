const { ethers } = require('ethers');
const provider = require('./provider');
const abi = require('./abi');
require('dotenv').config();

const privateKey = process.env.ServerPrivateKey;
const CA = process.env.CA;
const wallet = new ethers.Wallet(privateKey, provider);
const erc20 = new ethers.Contract(CA, abi, wallet);

class ServerAccounts {
  constructor() {
    this.wallet = wallet;
    this.contract = erc20;
  }
  // 현재 서버가 가지고 있는 토큰 확인
  async balanceOf() {
    try {
      const amount = await this.contract.balanceOf(this.wallet.address);
      const number = await amount.toNumber();
      return number;
    } catch (err) {
      console.log(err);
    }
  }

  // 보상으로 토큰 전달
  async rewardToken(toAddress, amount) {
    try {
      const sendToken = await this.contract.transfer(toAddress, amount);
      const result = await sendToken.wait();
      const transaction = {
        to: toAddress,
        value: ethers.utils.parseEther('0.0001'),
      };
      console.log(result);
      const sendEther = await this.wallet.sendTransaction(transaction);
      const result2 = await sendEther.wait();
      console.log(result2);
      console.log('토큰 및 이더 전송 완료');
    } catch (err) {
      console.log(err);
    }
  }
}

const ServerAccount = new ServerAccounts();

module.exports = ServerAccount;
