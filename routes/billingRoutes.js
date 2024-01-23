// billingRoutes.js
const express = require('express');
const router = express.Router();
const billingService = require('../services/billingService');


/**
 * @swagger
 * /billing/test:
 *   get:
 *   
 *     summary: Test the billing route
 *     tags: [Billing]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { message: 'Billing route test successful!' }
 */

// Test route for billing
router.get('/test', (req, res) => {
  res.json({ message: 'Billing route test successful!' });
});


/**
 * @swagger
 * /billing:
 *   post:
 *     summary: Create a new billing
 *     tags: [Billing]
 *     requestBody:
 *       description: Billing details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerID:
 *                 type: integer
 *                 description: ID of the customer
 *               paymentMethod:
 *                 type: string
 *                 description: Payment method
 *               transactionId:
 *                 type: string
 *                 description: Transaction ID
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *               lateFee:
 *                 type: number
 *                 description: Late fee amount
 *               taxAmount:
 *                 type: number
 *                 description: Tax amount
 *               discountAmount:
 *                 type: number
 *                 description: Discount amount
 *               promoCode:
 *                 type: string
 *                 description: Promo code
 *     responses:
 *       '201':
 *         description: Billing created successfully
 *         content:
 *           application/json:
 *             example: { success: true, billing: { /* Billing details  } }
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Internal Server Error' }
 */
// Create a billing
router.post('/addBill', async (req, res) => {
  const { customerID, paymentMethod, transactionId, notes, lateFee, taxAmount, discountAmount, promoCode } = req.body;

  try {
    const billing = await billingService.createBilling(
      customerID,
      paymentMethod,
      transactionId,
      notes,
      lateFee,
      taxAmount,
      discountAmount,
      promoCode
    );

    res.status(201).json({ success: true, billing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all billings
router.get('/', async (req, res) => {
  try {
    const billings = await billingService.getAllBillings();
    res.status(200).json({ success: true, billings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get billing by ID
router.get('/:billingID', async (req, res) => {
  const { billingID } = req.params;

  try {
    const billing = await billingService.getBillingById(billingID);
    res.status(200).json({ success: true, billing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update payment status
router.patch('/:billingID/update-payment-status', async (req, res) => {
  const { billingID } = req.params;
  const { newStatus } = req.body;

  try {
    const billing = await billingService.updatePaymentStatus(billingID, newStatus);
    res.status(200).json({ success: true, billing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;