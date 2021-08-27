const bcrypt = require('bcrypt');

const { User } = require('../../../../models');

const join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email: email }});
        if (exUser) {       // 이미 해당 유저가 있으면
            return res.status(422).json({   // 422 status code -> 서버가 요청을 이해는 했으나 해당 내용을 이행할 수 없음을 뜻함
                success: false,
                code: 422,
                error: "Unprocessable Entity"
            });
        }
        // 비밀번호 생으로 들어온다고 가정하고 우선 백에서 솔트 12번 침
        // password 는 무조건 string 이거나 Buffer 여야 함. -> 프론트 단에서 처리해서 제대로 된 JSON 보내기
        const hash = await bcrypt.hash(password, 12);
        await User.create({email, nick, password: hash});
        return res.status(201).json({
            success: true,
            code: 201
        });
    }
    // 다른 이유의 에러가 났다면 Error 처리 미들웨어로 보낸다. 500 반환
    catch (error) {
        return next(error);
    }
}

module.exports = join;