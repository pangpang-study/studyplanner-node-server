const { User } = require('../../../../models');


const profile = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.decoded.email }});
        const userInfo = {
            email: user.email,
            nick: user.nick,
        }
        return res.status(200).json({
            success: true,
            code: 200,
            userInfo
        })
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = profile;