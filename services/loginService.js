// ./services/loginService.js

const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginService {
  static async authenticateCustomer(email, password) {
    try {
      
      const customer = await Customer.findOne({ where: { email } });

      if (!customer) {
        console.error('Customer not found for email:', email);
        throw new Error('Customer not found');
      }

    //   console.log('Customer found:', customer);

      console.log('Stored Hashed Password:', customer ? customer.password : 'Customer not found');
      console.log('Provided Password Hash:', await bcrypt.hash(password, 10));

      const isPasswordValid = await bcrypt.compare(password, customer.password);

      console.log('Password Valid:', isPasswordValid);

      if (!isPasswordValid) {
        console.error('Invalid password for email:', email);
        throw new Error('Invalid password');
      }

      console.log('Password is valid');

      return customer;
    } catch (error) {
      console.error('Authentication error:', error.message);
      throw error;
    }
  }

  static generateAuthToken(customer) {
    const payload = {
      customerId: customer.customer_id_string,
      email: customer.email,
      // Add other relevant information in the payload
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
  }
}

module.exports = LoginService;
