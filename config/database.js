// config/database.js

const { Sequelize } = require('sequelize');
const { createLogger, transports } = require('winston');


// Create a logger
const logger = createLogger({
  transports: [
    new transports.Console(),
    
  ],
});

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// Log connection details
logger.info('Connecting to the database...');
sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((error) => {
    logger.error(`Unable to connect to the database: ${error.message}`);
  });
  
module.exports = sequelize;
