const { v4: uuidv4 } = require('uuid');

// Utility function to calculate the total amount based on billing details
const calculateTotalAmount = (billingDetails) => {
  let totalAmount = 0;
  for (const billingDetail of billingDetails) {
    totalAmount += billingDetail.rate * billingDetail.quantity;
  }
  return totalAmount;
};

// Utility function to generate a unique identifier
const generateUniqueIdentifier = () => {
  const uniqueId = uuidv4();
  return uniqueId;
};

module.exports = { calculateTotalAmount, generateUniqueIdentifier };
