// models/propertyModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require("./customerModel");

const Property = sequelize.define('Property', {
  propertyID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  propertyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  propertyAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  propertyType: {
    type: DataTypes.ENUM('Residential', 'Commercial', 'Vacant Land'),
    allowNull: false,
  },
  numberOfRooms: {
    type: DataTypes.INTEGER,
  },
  constructionYear: {
    type: DataTypes.INTEGER,
  },
  propertySize: {
    type: DataTypes.DECIMAL(10, 2),
  },
 
});



module.exports = Property;
