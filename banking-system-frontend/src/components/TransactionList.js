import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.transaction_type} - {transaction.amount} (Balance: {transaction.balance})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
