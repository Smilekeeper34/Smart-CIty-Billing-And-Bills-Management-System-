// userRoutes.js
const express = require('express');
const router = express.Router();

// Define routes and middleware here
router.get('/app', (req, res) => {
    res.send('Hello, users!');
  });


module.exports = router;
