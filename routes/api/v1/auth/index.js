const join = require('./join');
const login = require('./login');
const logout = require('./logout');
const refresh = require('./refresh');
const { isNotLoggedIn } = require('../../../../middlewares/auth')

const express = require('express');
const router = express.Router();

// base URL: /api/v1/auth

// GET
router.get('/logout', logout);
router.get('/accessToken', refresh);

// POST
router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);

module.exports = router;