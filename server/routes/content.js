const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Post } = require("../models");
const { Comment } = require("../models");

const Web3 = require("web3");
const web3 = new Web3(
  `https://ropsten.infura.io/v3/${process.env.INFURA_ADDRESS}`
);

const value = "2000000000000000000";
const erc20abi = require("../contracts/erc20abi");
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

  const newPost = await Post.create({
    writer: req.body.writer,
    title: req.body.title,
    content: req.body.content,
  }); // 포스팅 발행

  await User.increment(
    { balance: 2 },
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
        message: "Posting Successed",
        data: newPost,
      })
    ); // 콜백 헬 해결하기

  // try {
  //   res.status(201).json({
  //     message: "Posting Successed",
  //     data: newPost,
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     message: "Error: Posting Failed",
  //   });
  // }
});

router.patch("/update", async (req, res) => {
  await Post.update(
    { title: req.body.title, content: req.body.content },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  const updatedPost = await Post.findOne({
    where: {
      id: req.body.id,
    },
  });

  try {
    res.status(201).json({
      message: "update Successed",
      data: updatedPost,
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
      post_id: req.body.id,
    },
  });
  await Post.destroy({
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
