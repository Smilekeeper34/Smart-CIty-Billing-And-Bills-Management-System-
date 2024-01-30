// models/WaterUsage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WaterUsage = sequelize.define('WaterUsage', {
  UsageID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  CustomerID: {
    type: DataTypes.INTEGER,
  },
  Timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  Location: {
    type: DataTypes.STRING(255),
  },
  UsageAmount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  IsAnomaly: {
    type: DataTypes.BOOLEAN,
  },
  AnomalyReason: {
    type: DataTypes.TEXT,
  },
  DeviceID: {
    type: DataTypes.STRING(50),
  },
  WaterSource: {
    type: DataTypes.ENUM('TapWater', 'Well', 'River', 'Other'),
  },
  UsageCategory: {
    type: DataTypes.ENUM('Domestic', 'Commercial', 'Public'),
  },
  MeterReading: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

module.exports = WaterUsage;
