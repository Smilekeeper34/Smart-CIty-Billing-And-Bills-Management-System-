const Billing = require('../models/billingModel');
const BillingDetails = require('../models/billingDetailsModel');
const { calculateTotalAmount } = require('../utils/billingUtils');

// Controller to generate an invoice
const generateInvoice = async (req, res) => {
  const { billingCycleID } = req.params;

  try {
    // Fetch billing details for the specified billing cycle
    const billingDetails = await BillingDetails.findAll({
      where: { billingCycleID },
    });

    if (!billingDetails || billingDetails.length === 0) {
      return res.status(404).json({ success: false, error: 'No billing details found for the specified billing cycle' });
    }

    // Calculate total amount based on rates and quantities
    const totalAmount = calculateTotalAmount(billingDetails);

    // Generate invoice number
    const invoiceNumber = generateUniqueIdentifier();

    // Create a new billing record
    const newBilling = await Billing.create({
      customerID: req.body.customerID,
      billingDate: new Date(),
      dueDate: req.body.dueDate,
      paymentStatus: req.body.paymentStatus,
      paymentMethod: req.body.paymentMethod,
      transactionId: req.body.transactionId,
      notes: req.body.notes,
      invoiceNumber,
      lateFee: req.body.lateFee,
      taxAmount: req.body.taxAmount,
      discountAmount: req.body.discountAmount,
      promoCode: req.body.promoCode,
      // Additional fields or associations as needed
    });

    return res.status(201).json({ success: true, billing: newBilling });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error generating invoice' });
  }
};

module.exports = { generateInvoice };