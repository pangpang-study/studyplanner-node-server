const join = require('./join');
const login = require('./login');
const logout = require('./logout');
const token = require('./token');
const passport = require('passport');

const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../../../../utils/auth');

// base URL: /api/v1/auth

// DONE 1. join 구현
// DONE 2. passport 이해하고 login 구현하기.
// DONE 2.1 Access Token 생성 및 주고 받기
// DONE 2.2 Refresh Token 생성 및 Redis 저장
// DONE 3. Token 재발급 Refresh Token get 구현 및 /auth/token 구현
// TODO 4. Logout   why post?

// GET
//router.get('/token', token);
router.get('/token', token);

// POST
router.post('/join', join);
router.post('/login', login);
router.post('/logout', verifyAccessToken, logout);

module.exports = router;