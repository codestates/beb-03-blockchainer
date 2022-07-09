const express = require("express");
const router = express.Router();
const { Comment } = require("../models");
const { User } = require("../models");

const Web3 = require("web3");
const web3 = new Web3(
  `https://ropsten.infura.io/v3/${process.env.INFURA_ADDRESS}`
);
const erc20abi = require("../contracts/erc20abi");
const value = "1000000000000000000";
const server = web3.eth.accounts.wallet.add(process.env.SERVER_SECRET);
const erc20Contract = new web3.eth.Contract(
  erc20abi,
  process.env.ERC20_CONTRACT,
  {
    from: process.env.SERVER_ADDRESS,
  }
);

router.post("/posting", async (req, res) => {
  const receipt = await User.findOne({
    where: {
      username: req.body.writer,
    },
  });
  const newComment = await Comment.create({
    post_id: req.body.post_id,
    writer: req.body.writer,
    content: req.body.content,
  });

  await User.increment(
    { balance: 1 },
    {
      where: {
        username: req.body.writer,
      },
    }
  )
    .then(
      () =>
        setTimeout(
          () =>
            erc20Contract.methods.mintToken(receipt.address, value).send({
              from: server.address,
              to: process.env.ERC20_CONTRACT,
              gasPrice: 100,
              gas: 2000000,
            }),
          0
        ),
      (e) => console.error(e)
    )
    .then(() =>
      res.status(201).json({
        message: "Commenting Successed",
        data: newComment,
      })
    ); // 콜백 헬 해결하기

  // try {
  //   res.status(201).json({
  //     message: "Commenting Successed",
  //     data: newComment,
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     message: "Error: Commenting Failed",
  //   });
  // }
});

router.patch("/update", async (req, res) => {
  await Comment.update(
    { id: req.body.id, content: req.body.content },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  const updatedComment = await Comment.findOne({
    where: {
      id: req.body.id,
    },
  });

  try {
    res.status(201).json({
      message: "update Successed",
      data: updatedComment,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error: update Failed",
    });
  }
});

router.post("/delete", async (req, res) => {
  await Comment.destroy({
    where: {
      id: req.body.id,
    },
  }).then(
    res.status(200).json({
      message: "delete Successed",
    })
  );
});
module.exports = router;
