// logincontroller.js

const LoginService = require('../services/loginService');

class LoginController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const customer = await LoginService.authenticateCustomer(email, password);
      console.log('Stored Hashed Password:', customer ? customer.password : 'Customer not found');
      const token = LoginService.generateAuthToken(customer);

      res.status(200).json({ success: true, token, customer });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  }
}

module.exports = LoginController;
