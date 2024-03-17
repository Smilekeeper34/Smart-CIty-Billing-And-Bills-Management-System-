// services/customerService.js

const Customer = require('../models/customerModel');
const { createLogger, transports } = require('winston');

// Create a logger
const logger = createLogger({
  transports: [
    new transports.Console(),

  ],
});

const createCustomer = async (customerData) => {
  try {
    logger.info('Creating a new customer...');
    const customer = await Customer.create(customerData);
    logger.info('Customer created successfully.');
    return customer;
  } catch (error) {
    logger.error(`Error creating customer: ${error.message}`);
    throw new Error(`Error creating customer: ${error.message}`);
  }
};

const getAllCustomers = async () => {
  try {
    const customers = await Customer.findAll();
    return customers;
  } catch (error) {
    throw new Error(`Error getting customers: ${error.message}`);
  }
};

const getCustomerById = async (customerID) => {
  try {
    const customer = await Customer.findByPk(customerID);
    if (!customer) {
      throw new Error(`Customer with ID ${customerID} not found`);
    }
    return customer;
  } catch (error) {
    throw new Error(`Error getting customer: ${error.message}`);
  }
};

//const getCustomerByCustomID = async (customer_is_string) => {
//    try {
//    const customer = await Customer.findBy
//    }
//}

const updateCustomer = async (customerID, updatedData) => {
  try {
    const customer = await Customer.findByPk(customerID);
    if (!customer) {
      throw new Error(`Customer with ID ${customerID} not found`);
    }
    await customer.update(updatedData);
    return customer;
  } catch (error) {
    throw new Error(`Error updating customer: ${error.message}`);
  }
};

const deleteCustomer = async (customerID) => {
  try {
    const customer = await Customer.findByPk(customerID);
    if (!customer) {
      throw new Error(`Customer with ID ${customerID} not found`);
    }
    await customer.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error deleting customer: ${error.message}`);
  }
};

module.exports = {
  createCustomer,
  getCustomerById,
  updateCustomer,
  getAllCustomers,
  deleteCustomer,
};
