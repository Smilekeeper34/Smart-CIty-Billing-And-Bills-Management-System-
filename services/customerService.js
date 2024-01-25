// services/customerService.js

const { Customer } = require('../models/customerModel');

const createCustomer = async (customerData) => {
  try {
    const customer = await Customer.create(customerData);
    return customer;
  } catch (error) {
    throw new Error(`Error creating customer: ${error.message}`);
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
  deleteCustomer,
};
