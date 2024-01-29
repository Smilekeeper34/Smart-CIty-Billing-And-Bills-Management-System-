// controllers/tariffRateController.js
const TariffRate = require('../models/tariffRate');
const Location = require('../models/location');
const CustomerCategory = require('../models/customerCategory');

const createTariffRate = async (req, res) => {
  try {
    const { description, rate, locationID, categoryID } = req.body;

    const location = await Location.findByPk(locationID);
    const customerCategory = await CustomerCategory.findByPk(categoryID);

    if (!location || !customerCategory) {
      return res.status(400).json({ success: false, error: 'Invalid location or customer category' });
    }

    const newTariffRate = await TariffRate.create({
      description,
      rate,
      LocationId: locationID,
      CustomerCategoryId: categoryID,
    });

    return res.status(201).json({ success: true, tariffRate: newTariffRate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error creating tariff rate' });
  }
};

const updateTariffRate = async (req, res) => {
  try {
    const { tariffID } = req.params;
    const { description, rate, locationID, categoryID } = req.body;

    const existingTariffRate = await TariffRate.findByPk(tariffID);

    if (!existingTariffRate) {
      return res.status(404).json({ success: false, error: 'Tariff rate not found' });
    }

    const location = await Location.findByPk(locationID);
    const customerCategory = await CustomerCategory.findByPk(categoryID);

    if (!location || !customerCategory) {
      return res.status(400).json({ success: false, error: 'Invalid location or customer category' });
    }

    existingTariffRate.description = description;
    existingTariffRate.rate = rate;
    existingTariffRate.LocationId = locationID;
    existingTariffRate.CustomerCategoryId = categoryID;
    await existingTariffRate.save();

    return res.status(200).json({ success: true, tariffRate: existingTariffRate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error updating tariff rate' });
  }
};

const getAllTariffs = async (req, res) => {
  try {
    const tariffs = await Tariff.findAll();

    return res.status(200).json({ success: true, tariffs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error getting tariffs' });
  }
};

const getTariffByID = async (req, res) => {
  try {
    const { tariffID } = req.params;

    const tariff = await Tariff.findByPk(tariffID);

    if (!tariff) {
      return res.status(404).json({ success: false, error: 'Tariff not found' });
    }

    return res.status(200).json({ success: true, tariff });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error getting tariff' });
  }
};

const deleteTariff = async (req, res) => {
  try {
    const { tariffID } = req.params;

    const tariff = await Tariff.findByPk(tariffID);

    if (!tariff) {
      return res.status(404).json({ success: false, error: 'Tariff not found' });
    }

    await tariff.destroy();

    return res.status(200).json({ success: true, message: 'Tariff deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error deleting tariff' });
  }
};

module.exports = { createTariffRate, updateTariffRate , getAllTariffs,
  getTariffByID,
  deleteTariff,};
