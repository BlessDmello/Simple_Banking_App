//routes/customerRoutes.js
const express = require('express');
const { viewTransactions, performTransaction } = require('../controllers/customerController');
const router = express.Router();

router.get('/transactions', viewTransactions);
router.post('/transactions', performTransaction);

module.exports = router;
