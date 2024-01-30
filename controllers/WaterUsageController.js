// controllers/WaterUsageController.js
const WaterUsage = require('../models/WaterUsage');
const WaterUsageService = require('../services/WaterUsageService');

class WaterUsageController {
  static async collectAndStoreData(req, res) {
    try {
      const {
        CustomerID,
        Location,
        UsageAmount,
        IsAnomaly,
        AnomalyReason,
        DeviceID,
        WaterSource,
        UsageCategory,
        MeterReading,
      } = req.body;

      // Store water usage data in the database
      await WaterUsage.create({
        CustomerID,
        Location,
        UsageAmount,
        IsAnomaly,
        AnomalyReason,
        DeviceID,
        WaterSource,
        UsageCategory,
        MeterReading,
      });

      res.status(201).json({ success: true, message: 'Data collected and stored successfully' });
    } catch (error) {
      console.error('Error collecting and storing data:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  static async getWaterUsageByCustomer(req, res) {
    try {
      const { customerID } = req.params;
      const waterUsageData = await WaterUsageService.getWaterUsageByCustomer(customerID);

      return res.status(200).json({ success: true, data: waterUsageData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Error fetching water usage data' });
    }
  }
}

module.exports = WaterUsageController;
