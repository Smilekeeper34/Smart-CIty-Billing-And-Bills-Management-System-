// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API endpoints for customer support tickets
 */

/**
 * @swagger
 * /tickets/create:
 *   post:
 *     summary: Create a support ticket
 *     tags: [Tickets]
 *     requestBody:
 *       description: Ticket details
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerID: 1
 *             subject: 'Billing Inquiry'
 *             description: 'I have a question about my recent bill.'
 *     responses:
 *       '201':
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             example: { success: true, ticket: { ticketID: 1, customerID: 1, subject: 'Billing Inquiry', ... } }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error creating ticket' }
 */

router.post('/create', ticketController.createTicket);

/**
 * @swagger
 * /tickets/assign/{ticketID}:
 *   put:
 *     summary: Assign a ticket to an admin
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: ticketID
 *         required: true
 *         description: ID of the ticket
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Assignee details
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             assignee: 1
 *     responses:
 *       '200':
 *         description: Ticket assigned successfully
 *         content:
 *           application/json:
 *             example: { success: true, message: 'Ticket assigned successfully' }
 *       '404':
 *         description: Ticket not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Ticket not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error assigning ticket' }
 */

router.put('/assign/:ticketID', ticketController.assignTicket);

/**
 * @swagger
 * /tickets/updateStatus/{ticketID}:
 *   put:
 *     summary: Update the status of a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: ticketID
 *         required: true
 *         description: ID of the ticket
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated status
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: 'In Progress'
 *     responses:
 *       '200':
 *         description: Ticket status updated successfully
 *         content:
 *           application/json:
 *             example: { success: true, message: 'Ticket status updated successfully' }
 *       '404':
 *         description: Ticket not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Ticket not found' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error updating ticket status' }
 */

router.put('/updateStatus/:ticketID', ticketController.updateTicketStatus);

module.exports = router;
