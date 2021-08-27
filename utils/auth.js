const { verifyAccess } = require('./jwt');

module.exports = {
    // 사용자 인증 여부를 확인하는 모듈
    verifyAccessToken: (req, res, next) => {
        if(req.headers.authorization) {     // header 에 access token 이 들어있는지 검사
            const accessToken = req.headers.authorization.split("Bearer ")[1]; // Bearer type 으로 왔는지 검사하고 parsing
            req.decoded = verifyAccess(accessToken);
            if (req.decoded.success === true) {
                return next();      // return 을 붙여야 미들 웨어가 종료된다.
            }
            if (req.decoded.error === "jwt expired") {
                return res.status(419).json({
                    success: false,
                    code: 419,
                    error: "Access Token Expired",
                });
            }
            else if (req.decoded.error === 'jwt malformed') {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    error: "Token Invalid"
                })
            }
            else {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    error: "Access Failed"
                })
            }
        }
        else {
            // 토큰이 없는 경우.
            return res.status(401).json({
                success: false,
                code: 401,
                error: "No Token Sent",
            });
        }
    }
};
