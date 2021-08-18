const jwt = require('jsonwebtoken');

// 권한이 필요한 요청이 들어올 경우, 권한이 없다면 Forbidden
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {  // 권한이 필요한 경우인데, 토큰검사가 아니라 로그인 검사를 한 경우. -> 서버 코드가 잘못 된 경우
        return res.status(500).json({"error": "Server Logic Error"});
    }
};

// 회원가입이나 로그인을 하기 위해서, 로그인이 안되어 있는 경우.
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    // @질문 이 전략이 맞는지 모르겠음.
    // 로그인이 되어 있는데 권한을 요청 -> 서버 로직이 꼬여서 도달하게 되는 부분. 따라서 500 반환
    else {
        return res.status(500).json({"error": "Server Logic Error"});
    }
};

// 토큰이 존재하는지 확인.
exports.verifyToken = (req, res, next) => {
    try {
        // 2번째 인자인 토큰의 비밀키는 서버에 내장 되어있다.
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        next();     // 나머지 라우팅을 하기 위해 미들웨어 next()로 넘겨준다.
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            // TODO 토큰 만료된 경우를 위해서, 419 짜놓긴 했는데 아직 언제 어떻게 쓰일지를 몰라서 보완해야 하는 부분
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
            error: "Invalid Token",
        });
    }
};