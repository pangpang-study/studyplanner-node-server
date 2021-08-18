const passport = require('passport');
const local = require('./localStrategy');

const { User } = require('../models');

//세션에 사용자 정보를 모두 넘기면 용량이 커지기 때문에 id만 넘김.
module.exports = () => {
    passport.serializeUser((user, done) => {    // req.session 객체에 어떤 데이터를 저장할지 선택
        done(null, user.id);            // user 를 변수로 받아서 user.id 를 done 함수에 넘김.
    });

    passport.deserializeUser((id, done) => {    // 매 요청시 실행됨. passport.session() 미들웨어가 호출하는 부분
        User.find({ where: { id } })                // 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회
            .then(user => done(null, user))     // 이를 req.user 에 저장. 따라서 req.user 로 로그인한 사용자 정보를 가져올 수 있음
            .catch(err => done(err));
    });

    local(passport);
}