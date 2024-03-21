// app.js

require("dotenv").config();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Sequelize = require("sequelize");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { config,auth } = require('./config/authConfig');
const billingRoutes = require("./routes/billingRoutes");
const tariffRateRoutes = require('./routes/tariffRateRoutes');
const billingCycleRoutes = require('./routes/billingCycleRoutes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swaggerConfig");
const feedbackRoutes = require("./routes/feedbackRoutes");
const systemConfigRoutes = require("./routes/systemConfigRoutes");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require('./routes/propertyRoutes');
const waterUsageRoutes = require('./routes/waterUsageRoutes');
const houseRoutes = require('./routes/houseRoutes');

dotenv.config();
const app = express();
// Use the `cors` middleware
app.use(cors())
// Use the Auth0 middleware
app.use(auth(config));

app.use(bodyParser.json());
// Use Swagger UI for API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// use user routes
app.use("/users", userRoutes);
// use auth routes
app.use("/auth", authRoutes);
// use user feedback routes
app.use("/api/feedback", feedbackRoutes);
// use system config routes
app.use("/system/config", systemConfigRoutes);
// use Admin routes
app.use("/api/admin", require('./routes/adminRoutes')); 
// use customer routes
app.use("/api/customer",require('./routes/customerRoutes'));
// Use the billing routes
app.use("/api/billing",require('./routes/billingRoutes'));
app.use("/api/billing",require('./routes/billingDetailsRoutes'));
app.use('/api/billing-cycles', billingCycleRoutes);
app.use('/api/tariffRates', tariffRateRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/water-usage', waterUsageRoutes);
app.use('/api/houses', houseRoutes);


const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
