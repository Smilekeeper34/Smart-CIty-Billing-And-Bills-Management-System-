const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const LoginController = require('../controllers/loginController');

// Step 1: Register basic information (email, phone, password, name)
/**
 * @swagger
 * /auth/register/basic:
 *   post:
 *     summary: Register basic information (Step 1)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Basic information registered successfully
 *       400:
 *         description: Email or phone number is already registered
 *       500:
 *         description: Error registering basic information
 */
router.post('/register/basic', AuthController.registerBasicInfo);

// Step 2: Complete the registration with additional information
/**
 * @swagger
 * /auth/register/complete:
 *   post:
 *     summary: Complete registration with additional information (Step 2)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               
 *     responses:
 *       200:
 *         description: Registration completed successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error completing registration
 */
router.post('/register/complete', AuthController.completeRegistration);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the authentication was successful
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *                 customer:
 *                   type: object
 *                   description: Customer details
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the authentication failed
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/login', LoginController.login);

module.exports = router;
