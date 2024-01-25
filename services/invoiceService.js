// services/invoiceService.js

const { Billing } = require('../models/billingModel');
const billingService = require('./billingService');
const billingDetailsService = require('./billingDetailsService');
const { logger } = require('../utils/logger');

const generateInvoice = async (customerID, subscriptionName, subscriptionPrice, promoCode) => {
  try {
    // Simulate fetching customer details from a database
    const customer = await getCustomerDetails(customerID);

    // Calculate quantity, unit price, tax rate, and discount rate based on subscription details
    const quantity = 1;
    const unitPrice = subscriptionPrice;
    const taxRate = 10; // 10% tax rate
    const discountRate = customer.hasPromoCode ? 20 : 0; // 20% discount if customer has a promo code

    // Create billing entry
    const billing = await billingService.createBilling(customerID, 'Credit Card', null, null, null, null, null, promoCode);

    // Create billing details entry
    await billingDetailsService.createBillingDetails(
      billing.billID,
      subscriptionName,
      quantity,
      unitPrice,
      taxRate,
      discountRate
    );

    // Update billing with details total amount
    await billingService.updateBillingTotalAmount(billing.billID);

    // Log success
    logger.info(`Invoice generated successfully for CustomerID ${customerID}`);

    return billing;
  } catch (error) {
    // Log error
    logger.error(`Error generating invoice: ${error.message}`);

    throw new Error(`Error generating invoice: ${error.message}`);
  }
};

// Simulated function to get customer details from a database
const getCustomerDetails = async (customerID) => {
  // Assume fetching customer details from a database
  // This is just a placeholder, you should replace it with your actual database query logic
  return {
    hasPromoCode: true, // Simulated scenario where the customer has a promo code
  };
};

module.exports = {
  generateInvoice,
};
