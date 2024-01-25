// models/billingDetailsModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BillingDetails = sequelize.define('BillingDetails', {
  detailID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  taxRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  taxAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discountRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  discountAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = BillingDetails;
