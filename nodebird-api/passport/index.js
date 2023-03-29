const passport=require('passport');
const local=require('./localStrategy');
const kakao=require('./kakaoStrategy');
const User=require('../models/user');

module.exports=()=>{
    passport.serializeUser((user, done)=>{ // 로그인시 실행
        done(null, user.id); // 세션에 사용자 아이디 저장
    });

    passport.deserializeUser((id, done)=>{ // 매 요청시 실행
        User.findOne({ // 세션에 저장했던 사용자 아이디로 사용자 조회
            where: {id},
            include: [{ // 팔로워 목록 조회
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            },{ // 팔로잉 목록 조회
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        })
            .then(user=>done(null, user)) // user를 req.user에 저장
            .catch(err=>done(err));
    });

    local();
    kakao();
};