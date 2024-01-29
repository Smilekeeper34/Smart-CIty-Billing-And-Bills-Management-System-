const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/FeedbackController');

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: API endpoints for user feedback
 */

/**
 * @swagger
 * /feedback/submit:
 *   post:
 *     summary: Submit user feedback
 *     tags: [Feedback]
 *     requestBody:
 *       description: Feedback data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerID: 1
 *             content: "Great service, very helpful!"
 *     responses:
 *       '201':
 *         description: Feedback submitted successfully
 *         content:
 *           application/json:
 *             example: { success: true, feedback: { feedbackID: 1, customerID: 1, content: "Great service, very helpful!", createdAt: "2024-01-27T12:00:00Z" } }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error submitting feedback' }
 */

router.post('/submit', FeedbackController.submitFeedback);

/**
 * @swagger
 * /feedback/getAll:
 *   get:
 *     summary: Get all feedback entries
 *     tags: [Feedback]
 *     responses:
 *       '200':
 *         description: Feedback retrieved successfully
 *         content:
 *           application/json:
 *             example: { success: true, feedback: [{ feedbackID: 1, customerID: 1, content: "Great service, very helpful!", createdAt: "2024-01-27T12:00:00Z" }, ...] }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting feedback' }
 */

router.get('/getAll', FeedbackController.getAllFeedback);

module.exports = router;
