const express = require('express');
const router = express.Router();
const { Comment } = require('../models');
const { User } = require('../models');
const ServerAccount = require('../contract/serverAccount');

router.post('/posting', async (req, res) => {
  const { post_id, writer, content } = req.body;
  try {
    const newComment = await Comment.create({
      post_id,
      writer,
      content,
    });

    const user = await User.findOne({
      where: { username: writer },
    });
    // 게시물 작성시 rewardToken 1보상
    await ServerAccount.rewardToken(user.address, 1);

    await User.update(
      {
        balance: user.balance + 1,
      },
      {
        where: { username: user.username },
      }
    );
    res.status(201).json({
      message: 'Commenting Successed',
      data: newComment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error: Commenting Failed',
    });
  }
});

router.patch('/update', async (req, res) => {
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
      message: 'update Successed',
      data: updatedComment,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error: update Failed',
    });
  }
});

router.post('/delete', async (req, res) => {
  await Comment.destroy({
    where: {
      id: req.body.id,
    },
  }).then(
    res.status(200).json({
      message: 'delete Successed',
    })
  );
});
module.exports = router;
