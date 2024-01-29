// models/customerCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CustomerCategory = sequelize.define('CustomerCategory', {
  categoryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CustomerCategory;
