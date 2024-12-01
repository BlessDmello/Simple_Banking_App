// // src/components/TransactionForm.js

import React, { useState } from 'react';
import { performTransaction } from '../api';

const TransactionForm = ({ token, getTransactions }) => {
  const [transactionType, setTransactionType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleTransaction = async (e) => {
    e.preventDefault();

    try {
      await performTransaction(token, {
        transaction_type: transactionType,
        amount: parseFloat(amount),
      });
      setAmount('');
      setError('');
      getTransactions(); // Refresh transactions after the transaction
    } catch (err) {
      //console.log("Error response:", err.message);
      // if (err.response && err.response.data && err.response.data.error) {
      //   setError(err.message); // Show error message from the server
      // } else {
      //   setError('An unexpected error occurred');
      // }
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message); // Handle network errors
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h3>Perform Transaction</h3>
      <form onSubmit={handleTransaction}>
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Submit Transaction</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
    </div>
  );
};

export default TransactionForm;
