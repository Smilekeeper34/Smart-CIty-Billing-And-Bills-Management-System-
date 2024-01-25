const winston = require('winston');

// Create a Winston logger with Console and File transports
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.json(), // Change the format for file logs
    }),
    // Add more transports as needed (e.g., for logging to other targets)
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  level: 'info', // Set the default log level
});

module.exports = { logger };
