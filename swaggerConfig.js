const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de jwt-auth',
            version: '1.0.0',
            description: 'Api para cadastro, login e recuperar senha.',
            contact: {
                name: 'Suporte',
                email: 'suporte@exemplo.com',
            },
            servers: [
                {
                    url: 'http://localhost:8080',
                },
            ],
        },
    },
    apis: ['./routers/*.js'], // Define os arquivos onde estão as anotações Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
