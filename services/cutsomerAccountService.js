// customerAccountService

const customerAccount = require('../models/customerAccountModel');

const { createLogger, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console(),

  ],
});
class CustomerAccountService {
  constructor() {
    // Initialize any necessary properties or dependencies here
  }

  async deposit(customerId, amount) {
    try {
      const account = await customerAccount.findOne({ customerId });
      if (!account) {
        throw new Error(`Account not found for customer ${customerId}`);
      }

      account.balance += amount;
      await account.save();

      logger.info(`Deposited ${amount} into the account of customer ${customerId}`);
      return account;
    } catch (error) {
      logger.error(`Error depositing into account for customer ${customerId}: ${error.message}`);
      throw error;
    }
  }

  async withdraw(customerId, amount) {
    try {
      const account = await customerAccount.findOne({ customerId });
      if (!account) {
        throw new Error(`Account not found for customer ${customerId}`);
      }

      if (account.balance < amount) {
        throw new Error(`Insufficient funds for customer ${customerId}`);
      }

      account.balance -= amount;
      await account.save();

      logger.info(`Withdrawn ${amount} from the account of customer ${customerId}`);
      return account;
    } catch (error) {
      logger.error(`Error withdrawing from account for customer ${customerId}: ${error.message}`);
      throw error;
    }
  }

  async payBill(customerId, billAmount) {
    try {
      const account = await customerAccount.findOne({ customerId });
      if (!account) {
        throw new Error(`Account not found for customer ${customerId}`);
      }

      if (account.balance < billAmount) {
        throw new Error(`Insufficient funds to pay the bill for customer ${customerId}`);
      }

      account.balance -= billAmount;
      await account.save();

      logger.info(`Paid bill of ${billAmount} for customer ${customerId}`);
      return account;
    } catch (error) {
      logger.error(`Error paying bill for customer ${customerId}: ${error.message}`);
      throw error;
    }
  }

  async getAccountDetails(customerId) {
      try {
        const account = await customerAccount.findOne({ customerId });
        if (!account) {
          throw new Error(`Account not found for customer ${customerId}`);
        }

        logger.info(`Retrieved account details for customer ${customerId}`);
        return account;
      } catch (error) {
        logger.error(`Error getting account details for customer ${customerId}: ${error.message}`);
        throw error;
      }
    }

    async getTransactionHistory(customerId) {
      try {
        const transactions = await Transaction.find({ customerId }).sort({ timestamp: 'desc' });
        logger.info(`Retrieved transaction history for customer ${customerId}`);
        return transactions;
      } catch (error) {
        logger.error(`Error getting transaction history for customer ${customerId}: ${error.message}`);
        throw error;
      }
    }

    async setupAutomaticPayment(customerId) {
      try {
        const account = await customerAccount.findOne({ customerId });
        if (!account) {
          throw new Error(`Account not found for customer ${customerId}`);
        }


        const monthlyBill = calculateMonthlyBill(customerId);

        if (account.balance >= monthlyBill) {
          // Sufficient funds to pay the full bill
          account.balance -= monthlyBill;
        } else {
          // Insufficient funds, pay available balance and let it go to negative
          account.balance = 0;
        }

        await account.save();

        logger.info(`Automatic payment set up for customer ${customerId}. Monthly bill paid.`);
        return account;
      } catch (error) {
        logger.error(`Error setting up automatic payment for customer ${customerId}: ${error.message}`);
        throw error;
      }
    }

}

module.exports = CustomerAccountService;
