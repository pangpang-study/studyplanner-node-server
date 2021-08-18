const express = require('express');

const { verifyToken } = require('../../../middlewares/auth');
const { User } = require('../../../models');

const router = express.Router();


router.get('/', verifyToken, async (req, res) => {
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
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Internal Server Error"
        });
    }
});

module.exports = router;

/**
 * @swagger
 * tags:
 *      name: User
 *      description: about User Information
 */

/**
 * @swagger
 * definitions:
 *      User:
 *          properties:
 *              email:
 *                  type: string
 *              nick:
 *                  type: string
 */

/**
 * @swagger
 * /user:
 *  get:
 *      tags: [User]
 *      description: Get User Information
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: token
 *            description: attach json web token in request headers
 *            in: req.headers
 *            type: string
 *            required: true
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/definitions/User'
 */
