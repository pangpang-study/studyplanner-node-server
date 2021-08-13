const express = require('express');
const router = express.Router();

// GET: main page
router.get('/', (req, res) => {
    res.send({
        "value": "Hello World"
    });
});

router.get('/test', (req, res) => {
    res.send({
        "value": 1
    });
});

// POST return id, password for test
router.get('/login', (req, res) => {
    res.send({
        "id": req.body.id,
        "password": req.body.password
    });
});

module.exports = router;