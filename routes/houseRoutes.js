const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');

/**
 * @swagger
 * tags:
 *   name: Houses
 *   description: API endpoints for managing houses
 */

/**
 * @swagger
 * /api/houses/getAll:
 *   get:
 *     summary: Get all houses
 *     tags: [Houses]
 *     responses:
 *       200:
 *         description: Returns all houses
 */

router.get('/getAll', houseController.getAllHouses);

/**
 * @swagger
 * /api/houses/getHouse/{houseId}:
 *   get:
 *     summary: Get a house by ID
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         description: ID of the house to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the requested house
 *       404:
 *         description: House not found
 */

router.get('/getHouse/:houseId', houseController.getHouseById);

/**
 * @swagger
 * /api/houses/createHouse:
 *   post:
 *     summary: Create a new house
 *     tags: [Houses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HouseInput'
 *     responses:
 *       201:
 *         description: House created successfully
 *       400:
 *         description: Invalid request body
 */

router.post('/createHouse', houseController.createHouse);

/**
 * @swagger
 * /api/houses/updateHouse/{houseId}:
 *   put:
 *     summary: Update a house by ID
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         description: ID of the house to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HouseInput'
 *     responses:
 *       200:
 *         description: House updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: House not found
 */

router.put('/updateHouse/:houseId', houseController.updateHouse);

/**
 * @swagger
 * /api/houses/deleteHouse/{houseId}:
 *   delete:
 *     summary: Delete a house by ID
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         description: ID of the house to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: House deleted successfully
 *       404:
 *         description: House not found
 */

router.delete('/deleteHouse/:houseId', houseController.deleteHouse);

module.exports = router;
