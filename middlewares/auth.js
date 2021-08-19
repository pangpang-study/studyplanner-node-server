const { verifyAccess, verifyRefresh } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

// 권한이 필요한 요청이 들어올 경우, 권한이 없다면 Forbidden
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {  // 권한이 필요한 경우인데, 토큰검사가 아니라 로그인 검사를 한 경우. -> 서버 코드가 잘못 된 경우
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Internal Server Error",
        });
    }
};

// 회원가입이나 로그인을 하기 위해서, 로그인이 안되어 있는 경우.
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    // 로그인이 되어 있는데 권한을 요청
    else {
        return res.status(400).json({
            success: false,
            code: 400,
            error: "Already logged in",
        });
    }
};

// 액세스 토큰이 존재하는지 확인.
exports.verifyAccessToken = (req, res, next) => {
    try {
        // header 의 Bearer 뒤에 붙은 토큰 파싱
        const accessToken = req.headers.authorization.split("Bearer ")[1];
        // 미리 생성한 모듈을 통해 AccessToken 검사
        req.decoded = verifyAccess(accessToken);
        next();     // 나머지 라우팅을 하기 위해 미들웨어 next()로 넘겨준다.
    }
    catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
            // Access Token 이 만료된 상황 -> 419를 보내서 Refresh Token 으로 Access Token 을 재발급 받으라고 설정
            return res.status(419).json({
                success: false,
                code: 419,
                error: "Token Expired",
            });
        }
        // 토큰이 없는 경우.
        return res.status(401).json({
            success: false,
            code: 401,
            error: "Invalid Access Token",
        });
    }
};
