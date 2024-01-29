// routes/systemConfigRoutes.js
const express = require('express');
const router = express.Router();
const systemConfigController = require('../controllers/systemConfigController');

/**
 * @swagger
 * /system/config/get:
 *   get:
 *     summary: Get system configuration settings
 *     tags: [System Configuration]
 *     responses:
 *       '200':
 *         description: System configuration retrieved successfully
 *         content:
 *           application/json:
 *             example: { success: true, systemConfig: { maxUsers: 100, maxStorage: '1TB', maintenanceMode: false } }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting system configuration' }
 */

router.get('/get', systemConfigController.getSystemConfig);

/**
 * @swagger
 * /system/config/update:
 *   put:
 *     summary: Update system configuration settings
 *     tags: [System Configuration]
 *     requestBody:
 *       description: Updated system configuration
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             maxUsers: 150
 *             maxStorage: '2TB'
 *             maintenanceMode: true
 *     responses:
 *       '200':
 *         description: System configuration updated successfully
 *         content:
 *           application/json:
 *             example: { success: true, message: 'System configuration updated successfully' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error updating system configuration' }
 */

router.put('/update', systemConfigController.updateSystemConfig);

module.exports = router;
