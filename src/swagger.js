const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Form Management API',
            version: '1.0.0',
            description: 'API quản lý form cho admin và nhân viên SW',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);