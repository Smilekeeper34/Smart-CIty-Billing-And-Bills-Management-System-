// models/tariffRate.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TariffRate = sequelize.define('TariffRate', {
  tariffID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const Location = require('./location');
const CustomerCategory = require('./customerCategory');

TariffRate.belongsTo(Location);
TariffRate.belongsTo(CustomerCategory);

module.exports = TariffRate;
