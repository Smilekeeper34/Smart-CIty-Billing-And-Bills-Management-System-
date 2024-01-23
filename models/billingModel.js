// billingModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Billing = sequelize.define('Billing', {
  billID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  billingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
  transactionId: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  invoiceNumber: {
    type: DataTypes.STRING,
  },
  lateFee: {
    type: DataTypes.DECIMAL(10, 2),
  },
  taxAmount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  discountAmount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  promoCode: {
    type: DataTypes.STRING,
  },
});

module.exports = Billing;
