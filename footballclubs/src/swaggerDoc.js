const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'FootballClubs api',
            version: '1.0.0',
            description: 'REST API for create Football clubs'
        },
        tags: [
            {
                name: 'Clubs',
                description: '',
            },
            {
                name: 'Stadiums',
                description: '',
            },
        ],
        basePath: '/api',
    },

    apis: ['src/router.js', 'src/models/Club.js', 'src/models/Stadium.js'],
};
const specs = swaggerJsdoc(options);
module.exports = (app) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};