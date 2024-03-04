// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { config } = require('../config/authConfig');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddlewares');


/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin management
 */

/**
 * @swagger
 * /api/admin/create:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       description: Admin data
 *       required: true
 *       content:
 *         application/json: 
 *           example:
 *             username: admin123
 *             password: adminPassword
 *     responses:
 *       '201':
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             example: { success: true, admin: { adminID: 1, username: 'admin123', ... } }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error creating admin' }
 */

router.post('/create', adminController.createAdmin);

/**
 * @swagger
 * /api/admin/update/{adminID}:
 *   put:
 *     summary: Update admin by ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: adminID
 *         required: true
 *         description: ID of the admin
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Admin data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             password: newAdminPassword
 *     responses:
 *       '200':
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             example: { success: true, admin: { adminID: 1, username: 'admin123', ... } }
 *       '404':
 *         description: Admin not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Admin not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error updating admin' }
 */
router.put('/update/:adminID',authMiddleware.authenticateAdmin, adminController.updateAdmin);

/**
 * @swagger
 * /api/admin/deactivate/{adminID}:
 *   patch:
 *     summary: Deactivate admin by ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: adminID
 *         required: true
 *         description: ID of the admin
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Admin deactivated successfully
 *         content:
 *           application/json:
 *             example: { success: true, message: 'Admin deactivated successfully' }
 *       '404':
 *         description: Admin not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Admin not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error deactivating admin' }
 */

router.put('/deactivate/:adminID',authMiddleware.authenticateAdmin, adminController.deactivateAdmin);
/**
 * @swagger
 * /api/admin/getAll:
 *   get:
 *     summary: Get all admins
 *     tags: [Admins]
 *     responses:
 *       '200':
 *         description: Admins retrieved successfully
 *         content:
 *           application/json:
 *             example: { success: true, admins: [{ adminID: 1, username: 'admin1', ... }, { adminID: 2, username: 'admin2', ... }] }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting admins' }
 */
router.get('/getAll',authMiddleware.authenticateAdmin, adminController.getAllAdmins);
/**
 * @swagger
 * /api/admin/getByID/{adminID}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: adminID
 *         required: true
 *         description: ID of the admin
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Admin retrieved successfully
 *         content:
 *           application/json:
 *             example: { success: true, admin: { adminID: 1, username: 'admin123', ... } }
 *       '404':
 *         description: Admin not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Admin not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting admin' }
 */
router.get('/:adminID',authMiddleware.authenticateAdmin, adminController.getAdminByID);

module.exports = router;
