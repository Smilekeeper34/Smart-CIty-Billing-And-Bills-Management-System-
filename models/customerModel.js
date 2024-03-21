// models/customerModel.js

const { DataTypes, Sequelize, Model } = require("sequelize");

const sequelize = require("../config/database");
const Property = require("./propertyModel");
const CustomerIdGenerator = require("../services/customerIdGenerator");
const bcrypt = require("bcrypt");
const CustomerAccount = require("./customerAccountModel");

const Customer = sequelize.define(
  "Customer",
  {
    customerId: {
      type: DataTypes.INTEGER(8),
      primaryKey: true,
      unique: true,
      defaultValue: () => CustomerIdGenerator.generateCustId(),
    },
    customer_id_string: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      unique: true,
      defaultValue: () => CustomerIdGenerator.generateCustomerId(),
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
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
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
      type: DataTypes.ENUM("Email", "Phone", "SMS"),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isVIP: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    accountType: {
      type: DataTypes.ENUM("Landowner", "Tenant"),
      allowNull: false,
      defaultValue: "Landowner",
    },
    residentialType: {
      type: DataTypes.ENUM("House", "Apartment", "Condo", "Other"),
    },
    numberOfOccupants: {
      type: DataTypes.INTEGER,
    },
    monthlyIncome: {
      type: DataTypes.DECIMAL(10, 2),
    },
    billingPreference: {
      type: DataTypes.ENUM("Email", "Paper", "OnlinePortal"),
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
    landownerProperties: {
      type: DataTypes.INTEGER,
      references: {
        model: Property,
        key: "propertyID",
      },
    },
  },
  {
    tableName: "customers",
    hooks: {
      // Use hooks to create a CustomerAccount after a Customer is created
      afterCreate: async (customer) => {
        try {
          const { accountType } = customer.dataValues;
          await CustomerAccount.create({
            customer_id_string: customer.customer_id_string,
            accountType: accountType || "DefaultAccountType",
            balance: 0.0,
            cityBillAccount: true,
          });
        } catch (error) {
          console.error("Error creating CustomerAccount:", error);
        }
      },
    },
  }
);

Customer.associate = (models) => {
  Customer.hasMany(models.Property, {
    foreignKey: "customerId",
  });
  Customer.hasOne(models.CustomerAccount, {
    foreignKey: "customerId",
  });
  Customer.hasMany(models.Feedback, {
    foreignKey: "customerId",
  });
  Customer.hasMany(models.WaterUsage, {
    foreignKey: "customerId",
  });
  Customer.hasMany(models.House, {
    foreignKey: "customerId",
  });
};

module.exports = Customer;
