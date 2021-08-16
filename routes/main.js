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

router.post('/login', (req, res) => {
    res.send({
        "id": req.body.id,
        "password": req.body.password
    });
});

module.exports = router;


/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: about authentication
 */

/**
 * @swagger
 * definitions:
 *      Login:
 *          required:
 *              - id
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *              password:
 *                  type: string
 *              path:
 *                  type: string
 */

/**
 * @swagger
 * parameters:
 *      id:
 *        name: id
 *        description: user id
 *        in: formData
 *        required: true
 *        type: string
 */

/**
 * @swagger
 * /login:
 *  post:
 *      tags: [Authentication]
 *      description: Login to the application
 *      produces:
 *          - application/json
 *      parameters:
 *          - $ref: '#/parameters/id'
 *          - name: password
 *            description: user password
 *            in: formData
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: success to access
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: "#/definitions/Login"
 *              
 */