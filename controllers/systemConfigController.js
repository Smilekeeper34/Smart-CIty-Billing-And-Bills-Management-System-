// controllers/systemConfigController.js
const Configuration = require('../models/configurationModel');

const getSystemConfig = async (req, res) => {
  try {
    const systemConfig = await Configuration.findAll();
    const formattedConfig = systemConfig.reduce((acc, config) => {
      acc[config.key] = config.value;
      return acc;
    }, {});
    return res.status(200).json({ success: true, systemConfig: formattedConfig });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error getting system configuration' });
  }
};

const updateSystemConfig = async (req, res) => {
  try {
    const updatedConfig = req.body;

    // Validate and update configuration settings
    await Promise.all(
      Object.entries(updatedConfig).map(async ([key, value]) => {
        const configRecord = await Configuration.findByPk(key);
        if (configRecord) {
          configRecord.value = value;
          await configRecord.save();
        } else {
          await Configuration.create({ key, value });
        }
      })
    );

    return res.status(200).json({ success: true, message: 'System configuration updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error updating system configuration' });
  }
};

module.exports = { getSystemConfig, updateSystemConfig };
