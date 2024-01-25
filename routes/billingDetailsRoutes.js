// billingDetailsRoutes.js
const express = require("express");
const router = express.Router();
const billingDetailsService = require("../services/billingDetailsService");

/**
 * @swagger
 * /api/billing/billing-details:
 *   post:
 *     summary: Create billing details
 *     tags: [Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               billID:
 *                 type: integer
 *                 description: ID of the billing entry.
 *               description:
 *                 type: string
 *                 description: Description of the billing details.
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the item.
 *               unitPrice:
 *                 type: number
 *                 description: Price per unit.
 *               taxRate:
 *                 type: number
 *                 description: Tax rate applied.
 *               discountRate:
 *                 type: number
 *                 description: Discount rate applied.
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { success: true, billingDetails: { /* Billing details object } }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error creating billing details' }
 */
router.post("/", async (req, res) => {
  const { billID, description, quantity, unitPrice, taxRate, discountRate } =
    req.body;

  try {
    const billingDetails = await billingDetailsService.createBillingDetails(
      billID,
      description,
      quantity,
      unitPrice,
      taxRate,
      discountRate
    );

    res.status(201).json({ success: true, billingDetails });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: `Error creating billing details: ${error.message}`,
      });
  }
});

/**
 * @swagger
 * /api/billing/billing-details/{detailID}:
 *   get:
 *     summary: Get billing details by ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: detailID
 *         required: true
 *         description: ID of the billing details.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { success: true, billingDetails: { /* Billing details object  } }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting billing details' }
 */
router.get("/:detailID", async (req, res) => {
  const { detailID } = req.params;

  try {
    const billingDetails = await billingDetailsService.getBillingDetailsById(
      detailID
    );
    res.status(200).json({ success: true, billingDetails });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: `Error getting billing details: ${error.message}`,
      });
  }
});

module.exports = router;
