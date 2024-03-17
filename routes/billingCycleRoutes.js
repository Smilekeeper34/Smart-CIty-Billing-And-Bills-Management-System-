const express = require('express');
const router = express.Router();
const billingCycleController = require('../controllers/billingCycleController');
const authMiddleware = require('../middlewares/authMiddlewares');

/**
 * @swagger
 * tags:
 *   name: Billing Cycles
 *   description: Billing cycle management
 */

/**
 * @swagger
 * /api/billing-cycles/create:
 *   post:
 *     summary: Create a new billing cycle
 *     tags: [Billing Cycles]
 *     security:
 *       - auth0: []
 *     requestBody:
 *       description: Billing cycle data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: 'Monthly'
 *             startDate: '2024-02-01'
 *             endDate: '2024-02-28'
 *             rate: 2.456
 *             version: 1.0.0
 *     responses:
 *       '201':
 *         description: Billing cycle created successfully
 *         content:
 *           application/json:
 *             example: { success: true, billingCycle: { id: 1, name: 'Monthly', ... } }
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Billing cycle with the same name already exists' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error creating billing cycle' }
 */
router.post('/create',  billingCycleController.createBillingCycle);

/**
 * @swagger
 * /api/billingCycles/update/{billingCycleID}:
 *   put:
 *     summary: Update billing cycle by ID
 *     tags: [Billing Cycles]
 *     parameters:
 *       - in: path
 *         name: billingCycleID
 *         required: true
 *         description: ID of the billing cycle
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Billing cycle data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: 'Updated Cycle 1'
 *             startDate: '2024-02-01'
 *             endDate: '2024-02-28'
 *             rate: 15.99
 *     responses:
 *       '200':
 *         description: Billing cycle updated successfully
 *         content:
 *           application/json:
 *             example: { success: true, billingCycle: { id: 1, name: 'Updated Cycle 1', ... } }
 *       '404':
 *         description: Billing cycle not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Billing cycle not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error updating billing cycle' }
 */
router.put('/update/:billingCycleID', billingCycleController.updateBillingCycle);

/**
 * @swagger
 * /api/billingCycles/getByVersion/{billingCycleID}/{version}:
 *   get:
 *     summary: Get billing cycle by ID and version
 *     tags: [Billing Cycles]
 *     parameters:
 *       - in: path
 *         name: billingCycleID
 *         required: true
 *         description: ID of the billing cycle
 *         schema:
 *           type: integer
 *       - in: path
 *         name: version
 *         required: true
 *         description: Version of the billing cycle
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Billing cycle retrieved successfully
 *         content:
 *           application/json:
 *             example: { success: true, billingCycle: { id: 1, name: 'Cycle 1', ... } }
 *       '404':
 *         description: Billing cycle not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Billing cycle not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting billing cycle' }
 */
router.get('/getByVersion/:billingCycleID/:version', billingCycleController.getBillingCycleByVersion);


module.exports = router;
