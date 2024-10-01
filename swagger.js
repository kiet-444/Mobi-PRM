const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Swagger API',
        version: '1.0.0',
        description: 'Swagger API Documentation',
    },
    servers: [
        {
            url: 'https://backend-prm.vercel.app/',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
