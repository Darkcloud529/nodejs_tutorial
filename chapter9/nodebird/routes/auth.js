const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// 회원 가입 라우터
router.post('/join', isNotLoggedIn, async(req,res,next) => {
    const {email, nick, password} = req.body;
    try {
        // 기존에 같은 이메일로 가입한 사용자 확인
        const exUser = await User.findOne({where : {email} });
        if(exUser) { // 기존에 같은 이메일이 있다면?
            // 회원 가입 페이지로 되돌림
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch(error) {
        console.log(error);
        return next(error);
    }
});

// 로그인 라우터
router.post('/login', isNotLoggedIn, (req,res,next) => {
    // 로그인 요청시 passport.authenticate('local')가 로그인 전략 수행
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.log(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next); // 미들웨어 내의 미들웨어에는 (req,res,next)를 붙입니다. 
});

// 로그아웃 라우터 
router.get('/logout', isLoggedIn, (req,res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

// 카카오 로그인 라우터
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 성공 여부 결과 라우터
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req,res) => {
    res.redirect('/');
});


module.exports = router;