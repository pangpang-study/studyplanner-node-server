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

module.exports = router;