const express = require("express");
const router = express.Router();
const issueToken = require("../modules/issue");
const { User, Comment } = require("../models");

router.post("/", async (req, res) => {
  const newComment = await Comment.create({
    writer: req.body.writer,
    post_id: req.body.post_id,
    content: req.body.content,
  });

  const receipt = await User.findOne({
    where: {
      username: req.body.writer,
    },
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
      () => setTimeout(() => issueToken(receipt, 1), 0),
      (e) => console.error(e)
    )
    .then(() =>
      res.status(201).json({
        message: "Commenting Successed",
        data: newComment,
      })
    );
});

router.patch("/", async (req, res) => {
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

router.delete("/", async (req, res) => {
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
