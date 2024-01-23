// billingRoutes.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /billing/test:
 *   get:
 *     summary: Test the billing route
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { message: 'Billing route test successful!' }
 */

// Test route for billing
router.get('/test', (req, res) => {
  res.json({ message: 'Billing route test successful!' });
});

module.exports = router;