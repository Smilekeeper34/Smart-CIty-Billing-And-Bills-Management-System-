// userRoutes.js
const express = require('express');
const router = express.Router();
const { config, auth } = require('../config/authConfig');

/**
 * @swagger
 * /users/test:
 *   get:
 *     summary: Test the routes
 *     tags: [Test]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { message: 'Route test successful!', user: { /* user details } }
 */
// Define routes and middleware here
router.get('/test', (req, res) => {
  const response = {
    message: 'Route test successful!',
    user: req.oidc.user,
  };
  res.status(200).json(response);
});

module.exports = router;
