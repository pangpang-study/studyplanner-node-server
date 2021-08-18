const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PangPang Study Planner',
            version: '1.0.0',
        },
        basePath: '/api/v1/',
    },
    apis: ['./routes/**/**/*.js'],
};

const spec = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
}
