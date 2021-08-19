const { sign, verifyAccess, verifyRefresh } = require('../../../../utils/jwt');
const { User } = require('../../../../models');

const jwt = require('jsonwebtoken');

// 토큰 재발급을 위한 미들웨어
const refresh = async (req, res, next) => {
    if (req.headers.authorization && req.headers.refresh) {
        const accessToken = req.headers.authorization.split('Bearer ')[1];
        const refreshToken = req.headers.refresh;

        const decoded = jwt.decode(accessToken);
        if (decoded === null) {
            return res.status(401).json({
                success: false,
                code: 401,
                error: "Access token invalid",
            });
        }
        let user = null;
        try {
            user = await User.findOne({ where: { email: decoded.email } });
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                code: 401,
                error: err.message,
            });
        }

        const authResult = verifyAccess(accessToken);
        const refreshResult = verifyRefresh(refreshToken);

        if (!authResult.success && authResult.error === 'jwt expired') {
            if(!refreshResult.success) {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    error: "Both token invalid",
                });
            }
            else {
                const newAccessToken = sign(user);
                res.cookie("accessToken", newAccessToken, { maxAge: 86400 * 15, httpOnly: true });
                return res.status(200).json({
                    success: true,
                    code: 200,
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                code: 400,
                error: "Access token is not expired",
            })
        }
    }
    // 토큰을 헤더에 제대로 넣지 않아서 에러가 난 경우 하나라도 없는 경우
    else {
        return res.status(400).json({
            success: false,
            code: 400,
            error: "Tokens not exist in request headers",
        });
    }
};

module.exports = refresh;
