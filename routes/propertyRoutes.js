// routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');

/**
 * @swagger
 * /api/properties/register:
 *   post:
 *     summary: Register a new property
 *     tags:
 *       - Property Registration
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyName:
 *                 type: string
 *               propertyAddress:
 *                 type: string
 *     responses:
 *       201:
 *         description: Property registered successfully
 *       400:
 *         description: Property with the same name already exists
 *       500:
 *         description: Error registering property
 */
router.post('/register', PropertyController.registerProperty);

module.exports = router;
