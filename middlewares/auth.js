const jwt = require('jsonwebtoken');

// 권한이 필요한 요청이 들어올 경우, 권한이 없다면 Forbidden
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.status(403).json({"error": "No Permission"});
    }
};

// 회원가입이나 로그인을 하기 위해서, 로그인이 안되어 있는 경우.
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    // @질문 이 전략이 맞는지 모르겠음.
    // 로그인이 되어 있는데 권한을 요청 -> 로그인을 할 필요가 없기 때문에 역으로 Forbidden
    else {
        return res.status(403).json({"error": "No Permission"});
    }
};

// 토큰이 존재하는지 확인.
exports.verifyToken = (req, res, next) => {
    try {
        // 2번째 인자인 토큰의 비밀키는 서버에 내장 되어있다.
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(419).json({
                success: false,
                code: 419,
                error: "Token Expired",
            });
        }
        return res.status(401).json({
            success: false,
            code: 401,
            error: "Invalid Token",
        });
    }
};