const jwt = require('../../../../utils/jwt');
const { redisClient } = require('../../../../utils/redis');

const passport = require('passport');

// POST 로그인 -> POST /api/v1/auth/login
const login = async (req, res, next) => {
    passport.authenticate('local', {session: false}, (authError, user) => {
        // 이미 콜백에서 에러가 넘어온 경우 -> 다음 미들웨어로 에러 전송
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        // 유저가 없는 경우 -> 401 Unauthorized 전송
        if (!user) {
            return res.status(401).json({
                success: false,
                code: 401,
                error: "User not exist"
            });
        }
        // 로그인 시도
        return req.login(user, {session: false}, (loginError) => {
            // 로그인 오류 -> 401 Unauthorized 반환
            if(loginError) {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    error: loginError
                });
            }
            // 로그인 성공 -> 2개의 토큰 발급
            const accessToken = jwt.sign(user);
            const refreshToken = jwt.refresh();

            // redis set
            // TODO Redis 는 Hash 인가?? -> user.email 은 key 인데 중복되면 어떻게 동작하나?
            redisClient.set(user.email, refreshToken, "EX", 1200);

            // Access, Refresh Token 은 Entity Body 에 넣어서 보내는게 좋다고 한다.
            return res.status(200).json({
                success: true,
                code: 200,
                access: accessToken,
                refresh: refreshToken
            });
        });
    })(req, res, next);
};

module.exports = login;
