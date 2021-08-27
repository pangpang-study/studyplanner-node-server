const jwt = require('jsonwebtoken');
const redisClient = require('./redis');

const { accessOption, refreshOption } = require('../config/jwt-options');

module.exports = {
    // Access Token 발급 하는 모듈
    sign: (user) => {
        const payload = {
            email: user.email,
            nick: user.nick,
        };
        return jwt.sign(payload, process.env.JWT_SECRET, accessOption);
    },
    // Refresh Token 발급 하는 모듈
    refresh: () => {
        return jwt.sign({}, process.env.JWT_SECRET, refreshOption);
    },

    // Access Token 상태 확인 하는 모듈
    verifyAccess: (accessToken) => {
        let decoded = null;
        try {
            decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            return {
                success: true,
                email: decoded.email,
                nick: decoded.nick,
                error: null
            };
        }
        catch (err) {
            // 만료된 토큰 에서 payload 빼내기
            if (err.message === 'jwt expired'){
                const payload = jwt.verify(accessToken, process.env.JWT_SECRET, {ignoreExpiration: true} );
                return {
                    success: false,
                    email: payload.email,
                    nick: payload.nick,
                    error: err.message,
                }
            }
            return {
                success: false,
                email: undefined,
                nick: undefined,
                error: err.message,
            }
        }
    },

    // Refresh Token 상태 확인 하는 모듈
    verifyRefresh: async (refreshToken, userEmail) => {
        try {
            const data = await redisClient.get(userEmail);
            if (data === refreshToken) {
                try {
                    jwt.verify(refreshToken, process.env.JWT_SECRET);
                    return true;
                }
                catch (err) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}