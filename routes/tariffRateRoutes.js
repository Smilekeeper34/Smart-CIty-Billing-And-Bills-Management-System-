// routes/tariffRateRoutes.js
const express = require('express');
const router = express.Router();
const tariffRateController = require('../controllers/tariffRateController');
const authMiddleware = require('../middlewares/authMiddlewares');

/**
 * @swagger
 * /api/tariffRates:
 *   post:
 *     summary: Create a new tariff rate
 *     tags: [Tariff Rates]
 *     requestBody:
 *       description: Tariff rate data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             description: 'Standard Rate'
 *             rate: 0.5
 *             locationID: 1
 *             categoryID: 1
 *     responses:
 *       '201':
 *         description: Tariff rate created successfully
 *         content:
 *           application/json:
 *             example: { success: true, tariffRate: { tariffID: 1, description: 'Standard Rate', rate: 0.5 } }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error creating tariff rate' }
 */
router.post('/', authMiddleware.authenticateAdmin, tariffRateController.createTariffRate);

/**
 * @swagger
 * /api/tariffRates/getAll:
 *   get:
 *     summary: Get all tariffs
 *     tags: [Tariffs]
 *     responses:
 *       '200':
 *         description: Tariffs retrieved successfully
 *         content:
 *           application/json:
 *             example: { success: true, tariffs: [{ tariffID: 1, name: 'Tariff A', rate: 0.025, ... }, { tariffID: 2, name: 'Tariff B', rate: 0.03, ... }] }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting tariffs' }
 */
router.get('/getAll', tariffRateController.getAllTariffs);

/**
 * @swagger
 * /api/tariffRates/{tariffID}:
 *   get:
 *     summary: Get tariff by ID
 *     tags: [Tariffs]
 *     parameters:
 *       - in: path
 *         name: tariffID
 *         required: true
 *         description: ID of the tariff
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tariff retrieved successfully
 *         content:
 *           application/json:
 *             example: { success: true, tariff: { tariffID: 1, name: 'Tariff A', rate: 0.025, ... } }
 *       '404':
 *         description: Tariff not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Tariff not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting tariff' }
 */
router.get('/:tariffID', tariffRateController.getTariffByID);

/**
 * @swagger
 * /api/tariffRates/{tariffID}:
 *   delete:
 *     summary: Delete tariff by ID
 *     tags: [Tariffs]
 *     parameters:
 *       - in: path
 *         name: tariffID
 *         required: true
 *         description: ID of the tariff
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tariff deleted successfully
 *         content:
 *           application/json:
 *             example: { success: true, message: 'Tariff deleted successfully' }
 *       '404':
 *         description: Tariff not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Tariff not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error deleting tariff' }
 */
router.delete('/:tariffID', tariffRateController.deleteTariff);

/**
 * @swagger
 * /api/tariffRates/update/{tariffID}:
 *   put:
 *     summary: Update tariff rate by ID
 *     tags: [Tariff Rates]
 *     parameters:
 *       - in: path
 *         name: tariffID
 *         required: true
 *         description: ID of the tariff rate
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Tariff rate data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             description: 'Updated Standard Rate'
 *             rate: 0.6
 *             locationID: 2
 *             categoryID: 2
 *     responses:
 *       '200':
 *         description: Tariff rate updated successfully
 *         content:
 *           application/json:
 *             example: { success: true, tariffRate: { tariffID: 1, description: 'Updated Standard Rate', rate: 0.6 } }
 *       '404':
 *         description: Tariff rate not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Tariff rate not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error updating tariff rate' }
 */
router.put('/update/:tariffID', authMiddleware.authenticateAdmin, tariffRateController.updateTariffRate);

module.exports = router;
