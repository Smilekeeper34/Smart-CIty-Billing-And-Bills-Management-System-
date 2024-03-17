const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const { generateCustomAccountId } = require('../services/customAccountIdGenerator');

const CustomerAccount = sequelize.define(
  'CustomerAccount',
  {
    accountId: {
      type: DataTypes.STRING(15),
      primaryKey: true,
      unique: true,
      defaultValue: generateCustomAccountId,
    },
    accountType: {
      type: DataTypes.ENUM('Tenant', 'Landowner'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    cityBillAccount: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'customer_accounts',
  }
);

//const Customer = require('./customerModel');
//CustomerAccount.belongsTo(Customer);

module.exports = CustomerAccount;