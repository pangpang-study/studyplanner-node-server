const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./user');

const router = express.Router();

// base URL: /api/v1

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;

// Swagger - API Documentation

// Swagger Tags
/**
 * @swagger
 * tags:
 *    - name: Authentication
 *      description: about authentication and authorization
 *    - name: User
 *      description: about User Information
 */


// Swagger Definitions (Responses: Argument Object)
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
 *      Logout:
 *          required:
 *              - Access Token
 *              - Refresh Token
 *          properties:
 *              Access Token:
 *                  type: string
 *              Refresh Token:
 *                  type: string
 *      Profile:
 *          properties:
 *              email:
 *                  type: string
 *              nick:
 *                  type: string
 */


// Swagger Parameters (Requests)
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
 *      accessToken:
 *          name: accessToken
 *          description: Access Token
 *          in: headers authorization Bearer
 *          require: true
 *          type: string
 *      refreshToken:
 *          name: refreshToken
 *          description: Refresh Token
 *          in: headers refresh
 *          require: true
 *          type: string
 */


// Swagger Definitions (Responses: Status Code)
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


// Swagger - Authentication
// GET - token,
/**
 * @swagger
 * /auth/token:
 *  get:
 *      tags: [Authentication]
 *      description: Get Access Token using Refresh Token
 *      produces:
 *          - application/json
 *      parameters:
 *          - $ref: '#/parameters/accessToken'
 *          - $ref: '#/parameters/refreshToken'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#definitions/schemas/2xx'
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *          419:
 *              description: Refresh Token Timeout, You should login again
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 */
// POST - join, login
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
 *          201:
 *              description: Created Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/2xx'
 *          400:
 *              description: Already Logged in
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *          422:
 *              description: Requested Email Already Exists
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
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
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: whether it succeed
 *                              code:
 *                                  type: string
 *                                  description: response status code
 *                              accessToken:
 *                                  type: string
 *                                  description: jwt for authentication
 *                              refreshToken:
 *                                  type: string
 *                                  description: jwt for refresh access token
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 */
/**
 * @swagger
 * /auth/logout:
 *  post:
 *      tags: [Authentication]
 *      description: Logout
 *      produces:
 *          - application/json
 *      parameters:
 *          - $ref: '#/parameters/accessToken'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/2xx'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *          419:
 *              description: Access Token timeout, which means already logged out
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 */


// Swagger - User
// GET - profile
/**
 * @swagger
 * /user/profile:
 *  get:
 *      tags: [User]
 *      description: Get User Information
 *      produces:
 *          - application/json
 *      parameters:
 *          - $ref: '#/parameters/accessToken'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/definitions/Profile'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 *          419:
 *              description: Authentication Timeout
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/4xx'
 */