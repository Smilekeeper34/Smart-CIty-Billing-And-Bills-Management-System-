// models/configurationModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Configuration = sequelize.define('Configuration', {
  key: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Configuration;
