// app.js

require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const billingRoutes = require("./routes/billingRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swaggerConfig");

const app = express();

// Use Swagger UI for API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// use user routes
app.use("/users", userRoutes);
// Use the billing routes
app.use("/billing", billingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
