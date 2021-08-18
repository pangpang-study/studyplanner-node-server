const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth');

const router = express.Router();

// GET: main page
router.get('/', (req, res) => {
    res.send({
        "value": "Hello World"
    });
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.send({
        title: 'User Profile',
        user: req.user,
    });
});

module.exports = router;
