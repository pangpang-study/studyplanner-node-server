const jwt = require('../../../../utils/jwt');

const passport = require('passport');

// POST 로그인 -> POST /api/v1/auth/login
// return { cookie { accessToken, refreshToken }}
const login = async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                code: 401,
                error: "User not exist"
            });
        }
        return req.login(user, {session: false}, (loginError) => {
            if(loginError) {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    error: loginError
                });
            }
            // Token 발급
            const accessToken = jwt.sign(user);
            const refreshToken = jwt.refresh();

            // JWT 토큰을 Cookie 에 넣어서 보내주는 경우 HttpOnly 옵션을 넣어야 XSS 공격을 피할 수 있다.
            // cookie 에 Max Age 옵션을 넣어 자동 파기 되도록 하였다. 15일간 유지되도록. 어차피 토큰이 더 빨리 사라진다.
            // httpOnly Method 는 DOM 으로 쿠키 조작을 못하게 막는 것,
            // secure 는 HTTPS 만 사용가능 하도록 하는 것인데 일단 뺐음.
            res.cookie("accessToken", accessToken, { maxAge: 86400 * 15, httpOnly: true });
            res.cookie("refreshToken", refreshToken, { maxAge: 86400 * 15, httpOnly: true });
            return res.status(200).json({
                success: true,
                code: 200,
            });
        });
    })(req, res, next);
};

module.exports = login;
