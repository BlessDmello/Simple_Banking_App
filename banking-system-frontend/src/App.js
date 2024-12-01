
// export default App;
import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import TotalBalance from './components/TotalBalance';
import CustomerSelector from './components/CustomerSelector';
import { getTransactions, getTotalBalances } from './api';
import './index.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null); // Store the role
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // Add state for selected customer
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(token, selectedCustomerId); // Pass customer ID for fetching specific transactions
      setTransactions(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTotalBalance = async () => {
    try {
      const data = await getTotalBalances(token);
      setTotalBalance(data.total_balance);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRefresh = () => {
    fetchTransactions();
    fetchTotalBalance();
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId); // Update selected customer
    fetchTransactions(); // Fetch transactions for the selected customer
  };

  const handleLogout = () => {
    setToken(null); // Clear the token to log out the user
    setRole(null);
    setTransactions([]);
    setTotalBalance(null);
    setSelectedCustomerId(null); // Clear selected customer on logout
  };

return (
  <div>
    {!token ? (
      <AuthForm setToken={setToken} setRole={setRole} />
    ) : (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Welcome, {role === 'banker' ? 'Banker' : 'Customer'}!</h2>
          <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
        {role === 'banker' ? (
          <div>
            <button onClick={fetchTotalBalance} style={{ marginTop: '10px' }}>
              Refresh Total Balance
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TotalBalance totalBalance={totalBalance} />
            <CustomerSelector token={token} onCustomerSelect={handleCustomerSelect} />
            {selectedCustomerId && (
              <div>
                <h3>Transactions for Customer ID: {selectedCustomerId}</h3>
                <TransactionList transactions={transactions} />
              </div>
            )}
          </div>
        ) : (
          <div>
            <button onClick={fetchTransactions} style={{ marginTop: '10px' }}>
              Refresh Transactions
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TransactionForm token={token} getTransactions={fetchTransactions} />
            <TransactionList transactions={transactions} />
          </div>
        )}
      </div>
    )}
  </div>
);
};
export default App;