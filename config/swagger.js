const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
let router = require('express').Router();

const optionsJsdoc = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Test API',
      version: '1.0.0',
      description: 'Test Express API with autogenerated swagger doc',
    },
  },
  // va agregar todos los js y aquellos que tengan jsdoc con @swagger que se cuententren dentro de router y model
  // En Router vamos a poner todo la documentacion de los endpoint y en model las deficiniones de de objeto
  apis: ['./router/*.js', './model/*.js'],
};

const specs = swaggerJsdoc(optionsJsdoc);

var optionsUi = {
  swaggerOptions: {
    authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
  }
};


module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs,optionsUi));
};