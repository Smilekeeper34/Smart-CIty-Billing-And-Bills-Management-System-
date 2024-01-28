// config/authConfig.js

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'LsP4EobgcBgwSD15KFtHhToXTDg3C3j7F7akQi9ApcBxiatieUXP17K2okHIhV8q',
  baseURL: 'http://localhost:3000',
  clientID: 'tLXgsFpP1bOdlvel2qj4ESLk72Xvbrpp',
  issuerBaseURL: 'https://dev-mb8o8nmwjwyv2dv4.us.auth0.com',
};

module.exports = { config, auth };  // Export the auth middleware along with the config
