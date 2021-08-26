const { sign, verifyAccess, verifyRefresh } = require('../../../../utils/jwt');

const token = async (req, res, next) => {
    if (req.headers.authorization && req.headers.refresh) {
        // Access Token 의 만료 여부를 따짐.
        const accessToken = req.headers.authorization.split("Bearer ")[1];
        const accessStatus = verifyAccess(accessToken);
        if (accessStatus.success) {       // 토큰이 만료되지 않았다면
            return res.status(400).json({
                success: false,
                code: 400,
                error: "Token Not Expired"
            });
        }
        else if (accessStatus.error === "invalid token") {
            return res.status(400).json({
                success: false,
                code: 400,
                error: "Invalid Token"
            });
        }
        else {
            // Refresh Token 의 만료 여부를 따짐.
            const refreshStatus = await verifyRefresh(req.headers.refresh, accessStatus.email);
            if (refreshStatus) {
                // 새로운 JWT 발급
                const accessToken = sign(accessStatus);
                // Access, Refresh Token 은 Entity Body 에 넣어서 보내는게 좋다고 한다.
                return res.status(200).json({
                    success: true,
                    code: 200,
                    access: accessToken,
                    refresh: req.headers.refresh
                });
            }
            return res.status(419).json({
                success: false,
                code: 419,
                error: "Refresh Token Timeout, You should login again"
            })
        }
    }
    else {
        return res.status(400).json({
            success: false,
            code: 400,
            error: "No Token Sent"
        });
    }
}

module.exports = token;
