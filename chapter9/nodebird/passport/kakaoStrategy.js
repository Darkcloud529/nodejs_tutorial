// 카카오 로그인 전략
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID, // 카카오에서 발급해주는 ID ( 노출 X )
        callbackURL: '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            // 기존 카카오 유저인지 아닌지 확인
            const exUser = await User.findOne({
                where: {snsId: profile.id, provider: 'kakao'},
            });
            if (exUser) {
                done(null, exUser);
            } else {
                // 카카오를 통한 회원가입한 사용자가 없다면?
                const newUser = await User.create({
                    email: profile._json && profile_.json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
};