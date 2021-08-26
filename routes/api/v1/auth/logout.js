const redisClient = require('../../../../utils/redis');
const { verifyAccess } = require('../../../../utils/jwt');

const logout = async (req, res, next) => {
    try {
        await redisClient.del(req.decoded.email);
        return res.status(200).json({
            success: true,
            code: 200,
        });
    }
    catch (err) {
        // Internal Server Error 500
        console.log(err);
        next(err);
    }
};

module.exports = logout;
