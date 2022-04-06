const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
        // 아래의 코드를 봤을때 
        // 유저의 수를 찾는데 유저의 수가 점점 많아질수록
        // 아래의 코드는 전체적으로 시간을 느리게 만들어버린다. 
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      // create 방법 외에 다른 방법으로는
      // const user = new User({}) 한 다음에
      // await user.save(); 해주면 된다.
      // 하지만 sequlize와 동일하게 create를 추천한다. 
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  try {
      // object id를 찾은 다음에 실제 객체로 바꿔주는 것이 populate이다.
    const comments = await Comment.find({ commenter: req.params.id })
      .populate('commenter');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;