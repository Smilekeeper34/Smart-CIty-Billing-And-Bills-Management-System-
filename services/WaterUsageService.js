// services/WaterUsageService.js
const { WaterUsage } = require('../models/WaterUsage');

class WaterUsageService {
  static async getWaterUsageByCustomer(customerID) {
    try {
      const waterUsageData = await WaterUsage.findAll({
        where: { CustomerID: customerID },
        attributes: ['UsageID', 'Timestamp', 'Location', 'UsageAmount', 'WaterSource', 'UsageCategory', 'MeterReading'],
      });

      return waterUsageData;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching water usage data');
    }
  }
}

module.exports = WaterUsageService;
