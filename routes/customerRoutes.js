// routes/customerRoutes.js

const express = require("express");
const router = express.Router();
const customerService = require("../services/customerService");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API operations related to customers
 */

/**
 * @swagger
 * /api/customer/createCustomer:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       description: Customer data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             FirstName: John
 *             LastName: Doe
 *             StreetName: Main St
 *             SuburbName: Downtown
 *             City: Cityville
 *             State: Stateville
 *             ZipCode: 12345
 *             Country: USA
 *             AccountType: Landowner
 *             ContactNumber: +1234567890
 *             Email: john.doe@example.com
 *             DateOfBirth: 1990-01-01
 *             Gender: Male
 *             NationalID: ABC123
 *             Occupation: Engineer
 *             EmergencyContactName: Jane Doe
 *             EmergencyContactNumber: +1987654321
 *             PreferredCommunicationMethod: Email
 *             ResidentialType: House
 *             NumberOfOccupants: 2
 *             MonthlyIncome: 5000.00
 *             BillingPreference: Email
 *             WaterUsageAlert: 1
 *             UserEngagementOptIn: 1
 *             LastBillingDate: 2023-01-01
 *             LastPaymentDate: 2023-01-05
 *             UserFeedbackOptIn: 1
 *     responses:
 *       '201':
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             example: { success: true, customer: { CustomerID: 1, ... } }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error creating customer' }
 */
router.post("/createCustomer", async (req, res) => {
  const customerData = req.body;

  try {
    const customer = await customerService.createCustomer(customerData);
    res.status(201).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/customer/getAll:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       '200':
 *         description: A list of customers
 *         content:
 *           application/json:
 *             example: { success: true, customers: [{ CustomerID: 1, ... }, { CustomerID: 2, ... }] }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Error getting customers' }
 */
router.get('/getAll', async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error getting customers: ${error.message}` });
  }
});

/**
 * @swagger
 * /api/customer/{customerID}:
 *   get:
 *     summary: Get customer by ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerID
 *         required: true
 *         description: ID of the customer
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Customer found
 *         content:
 *           application/json:
 *             example: { success: true, customer: { CustomerID: 1, ... } }
 *       '404':
 *         description: Customer not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Customer not found' }
 */

router.get("/:customerID", async (req, res) => {
  const { customerID } = req.params;

  try {
    const customer = await customerService.getCustomerById(customerID);
    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(404).json({ success: false, error: "Customer not found" });
  }
});

/**
 * @swagger
 * /api/customer/{customerID}:
 *   put:
 *     summary: Update customer by ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerID
 *         required: true
 *         description: ID of the customer
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Customer data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             FirstName: John
 *             LastName: Doe
 *     responses:
 *       '200':
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             example: { success: true, customer: { CustomerID: 1, ... } }
 *       '404':
 *         description: Customer not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Customer not found' }
 */


router.put("/:customerID", async (req, res) => {
  const { customerID } = req.params;
  const updatedCustomerData = req.body;

  try {
    const customer = await customerService.updateCustomer(
      customerID,
      updatedCustomerData
    );
    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(404).json({ success: false, error: "Customer not found" });
  }
});

/**
 * @swagger
 * /api/customer/{customerID}:
 *   delete:
 *     summary: Delete customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerID
 *         required: true
 *         description: ID of the customer
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             example: { success: true, message: 'Customer deleted successfully' }
 *       '404':
 *         description: Customer not found
 *         content:
 *           application/json:
 *             example: { success: false, error: 'Customer not found' }
 */

router.delete("/:customerID", async (req, res) => {
  const { customerID } = req.params;

  try {
    await customerService.deleteCustomer(customerID);
    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, error: "Customer not found" });
  }
});

module.exports = router;
