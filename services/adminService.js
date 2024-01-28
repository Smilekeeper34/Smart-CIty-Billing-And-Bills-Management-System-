// services/adminService.js
const Admin = require('../models/adminModel');
const { logger } = require('../utils/logger');
const bcrypt = require('bcrypt');


const createAdmin = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });
    logger.info('Admin created successfully.');
    return admin;
  } catch (error) {
    logger.error(`Error creating admin: ${error.message}`);
    throw new Error(`Error creating admin: ${error.message}`);
  }
};

const updateAdmin = async (adminID, newData) => {
  try {
    const admin = await Admin.findByPk(adminID);

    if (!admin) {
      throw new Error(`Admin with ID ${adminID} not found`);
    }

    await admin.update(newData);
    logger.info('Admin updated successfully.');
    return admin;
  } catch (error) {
    logger.error(`Error updating admin: ${error.message}`);
    throw new Error(`Error updating admin: ${error.message}`);
  }
};

const deactivateAdmin = async (adminID) => {
  try {
    const admin = await Admin.findByPk(adminID);

    if (!admin) {
      throw new Error(`Admin with ID ${adminID} not found`);
    }

    await admin.update({ isActive: false });
    logger.info('Admin deactivated successfully.');
    return true;
  } catch (error) {
    logger.error(`Error deactivating admin: ${error.message}`);
    throw new Error(`Error deactivating admin: ${error.message}`);
  }
};

const getAllAdmins = async () => {
  try {
    const admins = await Admin.findAll();
    return admins;
  } catch (error) {
    logger.error(`Error getting all admins: ${error.message}`);
    throw new Error(`Error getting all admins: ${error.message}`);
  }
};

const getAdminByID = async (adminID) => {
  try {
    const admin = await Admin.findByPk(adminID);

    if (!admin) {
      throw new Error(`Admin with ID ${adminID} not found`);
    }

    return admin;
  } catch (error) {
    logger.error(`Error getting admin: ${error.message}`);
    throw new Error(`Error getting admin: ${error.message}`);
  }
};

module.exports = {
  createAdmin,
  updateAdmin,
  deactivateAdmin,
  getAllAdmins,
  getAdminByID,
};
