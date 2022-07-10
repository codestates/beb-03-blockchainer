const express = require("express");
const router = express.Router();
const issueToken = require("../modules/issue");
const { User, Post, Comment } = require("../models");

const value = "2000000000000000000";

router.post("/", async (req, res) => {
  const newPost = await Post.create({
    writer: req.body.writer,
    title: req.body.title,
    content: req.body.content,
  });

  const receipt = await User.findOne({
    where: {
      username: req.body.writer,
    },
  });

  await User.increment(
    { balance: 2 },
    {
      where: {
        username: req.body.writer,
      },
    }
  )
    .then(
      () => setTimeout(() => issueToken(receipt, value), 0),
      (e) => console.error(e)
    )
    .then(() =>
      res.status(201).json({
        message: "Posting Successed",
        data: newPost,
      })
    );
});

router.patch("/", async (req, res) => {
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

router.delete("/", async (req, res) => {
  await Comment.destroy({
    where: {
      post_id: req.body.id,
    },
  });
  await Post.destroy({
    where: {
      id: req.body.id,
    },
  });
  try {
    res.status(201).json({
      message: "delete Successed",
    });
  } catch (err) {
    res.status(400).json({
      message: "Error: delete Failed",
    });
  }
});

module.exports = router;
