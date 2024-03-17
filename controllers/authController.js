const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');
const LoginService = require('../services/loginService');

// Step 1: Register basic information (email, phone, password, name)
exports.registerBasicInfo = async (req, res) => {
  try {
    const { email, contactNumber, password, firstName, lastName } = req.body;

    // Check if the email is already registered
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ success: false, error: 'Email is already registered' });
    }

    // Check if the phone number is already registered
    const existingPhoneNumber = await Customer.findOne({ where: { contactNumber } });
    if (existingPhoneNumber) {
      return res.status(400).json({ success: false, error: 'Phone number is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Customer with basic information
    const newCustomer = await Customer.create({
      email,
      contactNumber,
      password: hashedPassword,
      firstName,
      lastName,
    });
    // Access the newly created customer's ID
    const customerID = newCustomer.get('customerId');

    // Generate a JWT token to be used in the next step
    const token = jwt.sign({ userId: newCustomer.customerID }, 'LsP4EobgcBgwSD15KFtHhToXTDg3C3j7F7akQi9ApcBxiatieUXP17K2okHIhV8q', { expiresIn: '30m' });
    console.log("Created customer:", newCustomer.toJSON());
    return res.status(201).json({ success: true, token , customerID});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error registering basic information' });
  }
};

// Step 2: Complete the registration with additional information
exports.completeRegistration = async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from the token

    // Find the user based on userId
    const user = await Customer.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Update user with additional information
    const { streetName,
        suburbName,
        city,
        state,
        zipCode,
        country,
        contactNumber,
        dateOfBirth,
        gender,
        nationalID,
        occupation,
        emergencyContactName,
        emergencyContactNumber,
        preferredCommunicationMethod,
        residentialType,
        numberOfOccupants,
        monthlyIncome,
        billingPreference, } = req.body;
    await user.update({ streetName,
        suburbName,
        city,
        state,
        zipCode,
        country,
        contactNumber,
        dateOfBirth,
        gender,
        nationalID,
        occupation,
        emergencyContactName,
        emergencyContactNumber,
        preferredCommunicationMethod,
        residentialType,
        numberOfOccupants,
        monthlyIncome,
        billingPreference, });

    return res.status(200).json({ success: true, message: 'Registration completed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error completing registration' });
  }

 
};
