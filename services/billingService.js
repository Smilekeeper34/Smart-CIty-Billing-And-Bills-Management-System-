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

module.exports = new BillingService();
