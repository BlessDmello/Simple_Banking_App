import React from 'react';

const TotalBalance = ({ totalBalance }) => {
  return (
    <div>
      <h3>Total Balance</h3>
      {totalBalance !== null ? (
        <p>Total Balance Across All Users: {totalBalance}</p>
      ) : (
        <p>Loading total balance...</p>
      )}
    </div>
  );
};

export default TotalBalance;
