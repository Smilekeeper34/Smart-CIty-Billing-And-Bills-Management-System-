// app.js

require("dotenv").config();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const billingRoutes = require("./routes/billingRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swaggerConfig");

dotenv.config();
const app = express();

app.use(bodyParser.json());
// Use Swagger UI for API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// use user routes
app.use("/users", userRoutes);
// Use the billing routes
app.use("/api/billing",require('./routes/billingRoutes'));

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
