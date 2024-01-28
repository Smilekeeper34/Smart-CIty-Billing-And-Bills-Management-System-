const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BillingCycle = sequelize.define('BillingCycle', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});

module.exports = BillingCycle;
