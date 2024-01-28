// models/customerModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  customerID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  streetName: {
    type: DataTypes.STRING(255),
  },
  suburbName: {
    type: DataTypes.STRING(100),
  },
  city: {
    type: DataTypes.STRING(100),
  },
  state: {
    type: DataTypes.STRING(100),
  },
  zipCode: {
    type: DataTypes.STRING(20),
  },
  country: {
    type: DataTypes.STRING(100),
  },
  otherAddressDetails: {
    type: DataTypes.TEXT,
  },
  contactNumber: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  registrationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
  },
  nationalID: {
    type: DataTypes.STRING(20),
  },
  occupation: {
    type: DataTypes.STRING(255),
  },
  emergencyContactName: {
    type: DataTypes.STRING(100),
  },
  emergencyContactNumber: {
    type: DataTypes.STRING(20),
  },
  preferredCommunicationMethod: {
    type: DataTypes.ENUM('Email', 'Phone', 'SMS'),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isVIP: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  residentialType: {
    type: DataTypes.ENUM('House', 'Apartment', 'Condo', 'Other'),
  },
  numberOfOccupants: {
    type: DataTypes.INTEGER,
  },
  monthlyIncome: {
    type: DataTypes.DECIMAL(10, 2),
  },
  billingPreference: {
    type: DataTypes.ENUM('Email', 'Paper', 'OnlinePortal'),
  },
  waterUsageAlert: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userEngagementOptIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastBillingDate: {
    type: DataTypes.DATE,
  },
  lastPaymentDate: {
    type: DataTypes.DATE,
  },
  userFeedbackOptIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'customers',});

module.exports = Customer;
