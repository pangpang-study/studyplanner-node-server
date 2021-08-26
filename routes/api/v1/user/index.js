const profile = require('./profile');

const { verifyAccessToken } = require('../../../../utils/auth')

const express = require('express');
const router = express.Router();

// base URL: /api/v1/user

// GET
router.get('/profile', verifyAccessToken, profile);

module.exports = router;