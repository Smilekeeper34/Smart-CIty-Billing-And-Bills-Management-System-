// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart City Billing APIs',
      version: '1.0.0',
      description: 'API documentation for the Smart City Billing and Bills Management System',
    },
  },
  // routes location
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
