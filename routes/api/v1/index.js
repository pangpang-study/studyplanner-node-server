const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./user');

const router = express.Router();

// base URL: /api/v1

router.use('/auth', authRouter);
//router.use('/user', userRouter);

module.exports = router;

// Swagger - API Documentation

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
