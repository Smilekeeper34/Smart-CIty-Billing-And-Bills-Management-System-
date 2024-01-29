// billingRoutes.js
const express = require('express');
const router = express.Router();
const billingService = require('../services/billingService');
const invoiceGeneration = require('../services/invoiceGeneration')

/**
 * @swagger
 * /api/billing/test:
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
 * /api/billing/addBill:
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

/**
 * @swagger
 * /api/billing/getAll:
 *   get:
 *     summary: Get all billings
 *     tags: [Billing]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { success: true, billings: [{ /* Billing details  }] }
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Internal Server Error' }
 */

// Get all billings
router.get('/getAll', async (req, res) => {
  try {
    const billings = await billingService.getAllBillings();
    res.status(200).json({ success: true, billings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/billing/:billingID:
 *   get:
 *     summary: Get billings by ID
 *     tags: [Billing]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { success: true, billings: [{ /* Billing details  }] }
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Internal Server Error' }
 */

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


/**
 * @swagger
 * /api/billing/{billingID}/update-payment-status:
 *   patch:
 *     summary: Update payment status of a billing
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: billingID
 *         required: true
 *         description: ID of the billing
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: New payment status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStatus:
 *                 type: string
 *                 description: New payment status
 *     responses:
 *       '200':
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             example: { success: true, billing: { /* Updated billing details  } }
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Internal Server Error' }
 */
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
/**
 * @swagger
 * /api/billing/generateInvoice/{billingCycleID}:
 *   post:
 *     summary: Generate an invoice for the specified billing cycle.
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: billingCycleID
 *         required: true
 *         description: ID of the billing cycle for which to generate the invoice.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Invoice data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerID: 1
 *             dueDate: '2023-01-31'
 *             paymentStatus: 'Pending'
 *             paymentMethod: 'Credit Card'
 *             transactionId: '123456789'
 *             notes: 'Additional notes for the invoice'
 *             lateFee: 10.00
 *             taxAmount: 5.00
 *             discountAmount: 2.50
 *             promoCode: 'SUMMER20'
 *     responses:
 *       '201':
 *         description: Invoice generated successfully
 *         content:
 *           application/json:
 *             example: { success: true, billing: { /* details of the generated invoice  } }
 *       '404':
 *         description: No billing details found for the specified billing cycle
 *         content:
 *           application/json:
 *             example: { success: false, error: 'No billing details found for the specified billing cycle' }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error generating invoice' }
 */
router.post('/generateInvoice/:billingCycleID', invoiceGeneration.generateInvoice);


module.exports = router;