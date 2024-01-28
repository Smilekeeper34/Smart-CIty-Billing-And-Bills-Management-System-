// controllers/adminController.js
const adminService = require('../services/adminService');

const createAdmin = async (req, res) => {
  // Extract data from the request body
  const { username, password } = req.body;

  try {
    const admin = await adminService.createAdmin(username, password);
    res.status(201).json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateAdmin = async (req, res) => {
  // Extract data from the request body and parameters
  const { adminID } = req.params;
  const newData = req.body;

  try {
    const admin = await adminService.updateAdmin(adminID, newData);
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deactivateAdmin = async (req, res) => {
  // Extract adminID from the request parameters
  const { adminID } = req.params;

  try {
    await adminService.deactivateAdmin(adminID);
    res.json({ success: true, message: 'Admin deactivated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAdminByID = async (req, res) => {
  // Extract adminID from the request parameters
  const { adminID } = req.params;

  try {
    const admin = await adminService.getAdminByID(adminID);
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createAdmin,
  updateAdmin,
  deactivateAdmin,
  getAllAdmins,
  getAdminByID,
};
