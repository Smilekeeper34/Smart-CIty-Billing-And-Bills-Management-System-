// controllers/propertyController.js

const Property = require('../models/propertyModel');

const registerProperty = async (req, res) => {
  try {
    const { propertyName, propertyAddress } = req.body;

    // Check if the property with the same name already exists
    const existingProperty = await Property.findOne({ where: { propertyName } });
    if (existingProperty) {
      return res.status(400).json({ success: false, error: 'Property with the same name already exists' });
    }

    // Create the property
    const newProperty = await Property.create({ propertyName, propertyAddress });

    return res.status(201).json({ success: true, property: newProperty });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error registering property' });
  }
};

module.exports = { registerProperty };
