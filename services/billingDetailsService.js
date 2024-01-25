// billingDetailsService.js

const { BillingDetails } = require('../models/billingDetailsModel');
const { Billing } = require('../models/billingModel');
const { logger } = require('../utils/logger'); 

const createBillingDetails = async (billID, description, quantity, unitPrice, taxRate, discountRate) => {
  try {
    // Input validation
    if (!billID || !description || !quantity || !unitPrice || !taxRate || !discountRate) {
      throw new Error('Invalid input parameters');
    }

    // Find the billing entry based on billID
    const billing = await Billing.findByPk(billID);

    if (!billing) {
      throw new Error(`Billing entry with BillID ${billID} not found`);
    }

    // Calculate amounts and create billing details entry
    const subtotal = quantity * unitPrice;
    const taxAmount = (subtotal * taxRate) / 100;
    const discountAmount = (subtotal * discountRate) / 100;
    const totalAmount = subtotal + taxAmount - discountAmount;

    const billingDetails = await BillingDetails.create({
      description,
      quantity,
      unitPrice,
      subtotal,
      taxRate,
      taxAmount,
      discountRate,
      discountAmount,
      totalAmount,
    });

    // Associate the billing details with the billing entry
    await billing.addBillingDetails(billingDetails);

    // Log success
    logger.info(`Billing details created successfully for BillID ${billID}`);

    return billingDetails;
  } catch (error) {
    // Log error
    logger.error(`Error creating billing details: ${error.message}`);

    throw new Error(`Error creating billing details: ${error.message}`);
  }
};

const getBillingDetailsById = async (detailID) => {
  try {
    // Input validation
    if (!detailID) {
      throw new Error('Invalid input parameter');
    }

    const billingDetails = await BillingDetails.findByPk(detailID);

    if (!billingDetails) {
      throw new Error(`Billing details with DetailID ${detailID} not found`);
    }

    return billingDetails;
  } catch (error) {
    // Log error
    logger.error(`Error getting billing details: ${error.message}`);

    throw new Error(`Error getting billing details: ${error.message}`);
  }
};

module.exports = {
  createBillingDetails,
  getBillingDetailsById,
};
