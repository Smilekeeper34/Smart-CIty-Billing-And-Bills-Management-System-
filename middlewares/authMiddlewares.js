const jwt = require('jsonwebtoken');
const { config, auth } = require('../config/authConfig');

// Import Winston logger
const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    // Add more transports as needed, e.g., file, database, etc.
  ],
});

const generateToken = (admin) => {
    const token = jwt.sign({ sub: admin.sub }, secret, { expiresIn: '1h' });
    return token;
  };
  

const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    logger.error('Unauthorized: Missing token');
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.admin = decoded.admin; // Attach admin data to the request
    next();
  } catch (error) {
    logger.error('Unauthorized: Invalid token', error);
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { authenticateAdmin , generateToken };
