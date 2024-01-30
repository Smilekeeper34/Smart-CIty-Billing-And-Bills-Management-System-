// routes/waterUsageRoutes.js
const express = require('express');
const router = express.Router();
const WaterUsageController = require('../controllers/WaterUsageController');

/**
 * @swagger
 * tags:
 *   name: WaterUsage
 *   description: Endpoints for collecting and storing water usage data
 */

/**
 * @swagger
 * api/water-usage/collect:
 *   post:
 *     summary: Collect and store water usage data
 *     tags: [WaterUsage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CustomerID:
 *                 type: integer
 *               Location:
 *                 type: string
 *               UsageAmount:
 *                 type: number
 *               IsAnomaly:
 *                 type: boolean
 *               AnomalyReason:
 *                 type: string
 *               DeviceID:
 *                 type: string
 *               WaterSource:
 *                 type: string
 *                 enum: [TapWater, Well, River, Other]
 *               UsageCategory:
 *                 type: string
 *                 enum: [Domestic, Commercial, Public]
 *               MeterReading:
 *                 type: number
 *     responses:
 *       201:
 *         description: Data collected and stored successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/collect', WaterUsageController.collectAndStoreData);

/**
 * @swagger
 * tags:
 *   name: WaterUsage
 *   description: Endpoints for collecting and storing water usage data
 */

/**
 * @swagger
 * api/water-usage/collect:
 *   post:
 *     summary: Collect and store water usage data
 *     tags: [WaterUsage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CustomerID:
 *                 type: integer
 *               Location:
 *                 type: string
 *               UsageAmount:
 *                 type: number
 *               IsAnomaly:
 *                 type: boolean
 *               AnomalyReason:
 *                 type: string
 *               DeviceID:
 *                 type: string
 *               WaterSource:
 *                 type: string
 *                 enum: [TapWater, Well, River, Other]
 *               UsageCategory:
 *                 type: string
 *                 enum: [Domestic, Commercial, Public]
 *               MeterReading:
 *                 type: number
 *     responses:
 *       201:
 *         description: Data collected and stored successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * api/water-usage/{customerID}:
 *   get:
 *     summary: Get water usage data for a specific customer
 *     tags: [WaterUsage]
 *     parameters:
 *       - in: path
 *         name: customerID
 *         required: true
 *         description: ID of the customer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Water usage data retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get('/:customerID', WaterUsageController.getWaterUsageByCustomer);

module.exports = router;
