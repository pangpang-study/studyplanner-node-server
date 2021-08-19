const bcrypt = require('bcrypt');

const { User } = require('../../../../models');

const join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email: email }});
        if (exUser) {
            return res.status(200).json({
                success: false,
                code: 200
            });
        }
        // 비밀번호 생으로 들어온다고 가정하고 우선 백에서 솔트 12번 침
        const hash = await bcrypt.hash(password, 12);
        await User.create({ email, nick, password: hash });
        return res.status(201).json({
            success: true,
            code: 201
        });
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
}

module.exports = join;