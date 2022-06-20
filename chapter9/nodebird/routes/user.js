const express = require('express');

const { isLoggedIn } = require('./middlewares');
const {addFollowing} = require('../controllers/user');
//const User = require('../models/user');

const router = express.Router();

// 다른 사용자 팔로우 기능
router.post('/:is/follow', isLoggedIn, addFollowing);

module.exports = router;