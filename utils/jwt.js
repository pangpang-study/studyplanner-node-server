const jwt = require('jsonwebtoken');
const redisClient = require('./redis');
const { promisify } = require('util');

module.exports = {
    sign: (user) => {
        const payload = {
            email: user.email,
            nick: user.nick,
        };
        return jwt.sign(payload, process.env.JWT_SECRET,{
            algorithm: 'HS512',
            expiresIn: '1h',
        });
    },
    refresh: () => {
        return jwt.sign({}, process.env.JWT_SECRET, {
            algorithm: 'HS512',
            expiresIn: '10d',
        });
    },
    verifyAccess: (accessToken) => {
        let decoded = null;
        try {
            decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            return {
                success: true,
                email: decoded.email,
                nick: decoded.nick,
            };
        }
        catch (err) {
            return {
                success: false,
                error: err.message,
            }
        }
    },
    verifyRefresh: async (aRefreshToken, userEmail) => {
        const getToken = promisify(redisClient.get).bind(redisClient);
        try {
            const sRefreshToken = await getToken(userEmail);
            if (aRefreshToken === sRefreshToken) {
                try {
                    jwt.verify(aRefreshToken, process.env.JWT_SECRET);
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
            return false;
        }
    }
}