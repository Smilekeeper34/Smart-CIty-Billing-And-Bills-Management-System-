// userRoutes.js
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /users/test:
 *   get:
 *     summary: Test the  routes
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { message: 'route test successful!' }
 */
// Define routes and middleware here
router.get('/test', (req, res) => {
    res.send('Hello, users!');
  });


module.exports = router;
