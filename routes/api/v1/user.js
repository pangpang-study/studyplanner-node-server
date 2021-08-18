const express = require('express');

const { verifyToken } = require('../../../middlewares/auth');
const { User } = require('../../../models');

const router = express.Router();


router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.decoded.email }})
        return res.status(200).json({
            success: true,
            code: 200,
            user
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