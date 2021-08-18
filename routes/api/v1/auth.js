const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { isNotLoggedIn, verifyToken } = require('../../../middlewares/auth');
const { User } = require('../../../models');

const router = express.Router();

// POST 회원가입 -> POST /api/v1/auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email }});
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
});

// POST 로그인 -> POST /api/v1/auth/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {     // authenticate 자체 에러가 나는 경우
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                code: 401,
                error: info.message
            });
        }
        return req.login(user, (loginError) => {    // passport 가 req 에게 login 을 심는다.
            if(loginError) {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    error: info.message
                });
            }
            // jwt 발급
            const token = jwt.sign({
                email: user.email,
                nick: user.nick,
            }, process.env.JWT_SECRET, {
                expiresIn: '10m',           // 아직 refresh token 을 공부를 못해서 만료 기한을 애매하게 10분으로 설정했음.
                issuer: "pangpang",
            });
            res.cookie("token", token);
            return res.status(200).json({
                success: true,
                code: 200,
            });
        });
    })(req, res, next);
});

router.get('/logout', verifyToken, (req, res) => {
    console.log(req.headers);
    req.logout();
    res.status(200).json({
        success: true,
        code: 200
    });
});

module.exports = router;

/**
 * @swagger
 * tags:
 *      name: Authentication
 *      description: about authentication and authorization
 */

/**
 * @swagger
 * definitions:
 *      Join:
 *          required:
 *              - email
 *              - nick
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *              nick:
 *                  type: string
 *              password:
 *                  type: string
 *      Login:
 *          required:
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *              password:
 *                  type: string
 */

/**
 * @swagger
 * parameters:
 *      email:
 *          name: email
 *          description: User Email
 *          in: json
 *          required: true
 *          type: string
 *      password:
 *          name: password
 *          description: User Password
 *          in: json
 *          required: true
 *          type: string
 *      nick:
 *          name: nick
 *          description: User NickName
 *          in: json
 *          required: true
 *          type: string
 */

/**
 * @swagger
 * definitions:
 *      schemas:
 *          2xx:
 *              properties:
 *                  success:
 *                      type: boolean
 *                      description: whether it succeed
 *                  code:
 *                      type: string
 *                      description: response status code
 *          4xx:
 *              properties:
 *                  success:
 *                      type: boolean
 *                      description: whether it succeed
 *                  code:
 *                      type: string
 *                      description: response status code
 *                  error:
 *                      type: string
 *                      description: error message
 */

/**
 * @swagger
 * /auth/logout:
 *  get:
 *      tags: [Authentication]
 *      description: Logout
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/2xx'
 */

/**
 * @swagger
 * /auth/join:
 *  post:
 *      tags: [Authentication]
 *      description: Sign Up to the application
 *      produces:
 *          - application/json
 *      parameters:
 *          - $ref: '#/parameters/email'
 *          - $ref: '#/parameters/nick'
 *          - $ref: '#/parameters/password'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/2xx'
 *          401:
 *              description: Unauthorized, Login Required
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *          403:
 *              description: Forbidden, No Permission
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      tags: [Authentication]
 *      description: Login to the application
 *      produces:
 *          - application/json
 *      parameters:
 *          - $ref: '#/parameters/email'
 *          - $ref: '#/parameters/password'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/2xx'
 *          401:
 *              description: Unauthorized, Login Required
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *          403:
 *              description: Forbidden, No Permission
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *
 */
