import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Define BASE_URL here

const CustomerSelector = ({ token, onCustomerSelect }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/banker/customers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCustomers();
  }, [token]);

  return (
    <div>
      <h3>Select a Customer</h3>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <button onClick={() => onCustomerSelect(customer.id)}>
              {customer.username} (ID: {customer.id})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerSelector;
