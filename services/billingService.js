// billingService.js
const Billing = require('../models/billingModel');

class BillingService {
    async createBilling(customerID, paymentMethod, transactionId, notes, lateFee, taxAmount, discountAmount, promoCode) {
        try {
          const billing = await Billing.create({
            customerID,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 days from the billing date
            paymentMethod,
            transactionId,
            notes,
            invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`, // Generate a random invoice number
            lateFee,
            taxAmount,
            discountAmount,
            promoCode,
          });
          return billing;
        } catch (error) {
          throw error;
        }
      }

  async getBillingById(billingID) {
    try {
      const billing = await Billing.findByPk(billingID);
      return billing;
    } catch (error) {
      throw error;
    }
  }

  async getAllBillings() {
    try {
      const billings = await Billing.findAll();
      return billings;
    } catch (error) {
      throw error;
    }
  }

  async updatePaymentStatus(billingID, newStatus) {
    try {
      const billing = await Billing.findByPk(billingID);
      if (billing) {
        billing.paymentStatus = newStatus;
        await billing.save();
        return billing;
      } else {
        throw new Error('Billing not found');
      }
    } catch (error) {
      throw error;
    }
  }
}
const processPayment = async (req, res) => {
  try {
    const { customerID, amount, paymentMethod, transactionId } = req.body;

    // Simulate interaction with an external payment gateway
    const paymentGatewayResponse = await simulatePaymentGatewayInteraction(amount, paymentMethod, transactionId);

    // Check if payment was successful
    if (!paymentGatewayResponse.success) {
      return res.status(400).json({ success: false, error: 'Payment failed. Please try again.' });
    }

    // Simulating payment processing with a delay of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Assuming you have a Payment model, you can create a new payment record
    const newPayment = await Payment.create({
      customerID,
      amount,
      paymentMethod,
      transactionId,
      paymentDate: new Date(),
      // Additional fields or associations as needed
    });

    // Update payment status for the corresponding invoice or billing record
    const invoice = await Invoice.findOne({ where: { customerID } });

    if (!invoice) {
      return res.status(404).json({ success: false, error: 'Invoice not found' });
    }

    invoice.paymentStatus = 'Paid';
    await invoice.save();

    return res.status(200).json({ success: true, payment: newPayment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error processing payment' });
  }
};

// Simulate interaction with an external payment gateway
const simulatePaymentGatewayInteraction = async (amount, paymentMethod, transactionId) => {
  // Your logic to interact with a real payment gateway would go here
  // For simulation purposes, this example assumes success after 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real scenario, you would handle the payment gateway response
  // This could include checking if the payment was successful, handling errors, etc.

  // Simulating a successful payment
  return { success: true, message: 'Payment successful' };
};


module.exports = new BillingService();
