const BillingCycle = require('../models/billingCycle');

const createBillingCycle = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the billing cycle with the same name already exists
    const existingBillingCycle = await BillingCycle.findOne({ where: { name } });
    if (existingBillingCycle) {
      return res.status(400).json({ success: false, error: 'Billing cycle with the same name already exists' });
    }

    // Create the billing cycle
    const newBillingCycle = await BillingCycle.create({ name });

    return res.status(201).json({ success: true, billingCycle: newBillingCycle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error creating billing cycle' });
  }
};
const updateBillingCycle = async (req, res) => {
    try {
      const { billingCycleID } = req.params;
      const { name, startDate, endDate, rate } = req.body;
  
      const existingBillingCycle = await BillingCycle.findByPk(billingCycleID);
  
      if (!existingBillingCycle) {
        return res.status(404).json({ success: false, error: 'Billing cycle not found' });
      }
  
      // Increment the version
      existingBillingCycle.version += 1;
      await existingBillingCycle.save();
  
      // Create a new billing cycle with the updated rate
      const newBillingCycle = await BillingCycle.create({
        name,
        startDate,
        endDate,
        rate,
        version: existingBillingCycle.version,
      });
  
      return res.status(200).json({ success: true, billingCycle: newBillingCycle });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Error updating billing cycle' });
    }
  };
  

// Example for getting a billing cycle by ID and version
const getBillingCycleByVersion = async (req, res) => {
    try {
      const { billingCycleID, version } = req.params;
  
      const billingCycle = await BillingCycle.findOne({
        where: { id: billingCycleID, version },
      });
  
      if (!billingCycle) {
        return res.status(404).json({ success: false, error: 'Billing cycle not found' });
      }
  
      return res.status(200).json({ success: true, billingCycle });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Error getting billing cycle' });
    }
  };
  

module.exports = {
  createBillingCycle,updateBillingCycle,getBillingCycleByVersion
  
};
