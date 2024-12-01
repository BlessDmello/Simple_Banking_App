//routes/bankerRoutes.js
const express = require('express');
const { viewTotalBalances, viewCustomerTransactions, viewCustomer } = require('../controllers/bankerController');
const router = express.Router();

router.get('/total-balances', viewTotalBalances);
router.get('/transactions/:userId', viewCustomerTransactions);
router.get('/customers', viewCustomer);
  

module.exports = router;
