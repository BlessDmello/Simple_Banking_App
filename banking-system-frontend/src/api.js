// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  } 
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get transactions
export const getTransactions = async (token, customerId = null) => {
  try {
    const url = customerId
      ? `${BASE_URL}/banker/transactions/${customerId}` // Fetch specific customer transactions
      : `${BASE_URL}/customer/transactions`; // Default to current user's transactions

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
 
// Perform a transaction (deposit or withdrawal)
export const performTransaction = async (token, transactionData) => {
  try {
    // Send the POST request to perform the transaction
    const response = await axios.post(
      `${BASE_URL}/customer/transactions`, 
      transactionData, 
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { t: new Date().getTime() }, // Adding timestamp to avoid caching issues
      }
    );

    // Return the response data if successful
    return response.data;

  } catch (error) {
    // Check if the error response exists
    if (error.response) {
      // Log the entire error to the console for debugging purposes
      console.error('Error response:', error.response);

      // If there's a specific error message in the response, return it
      if (error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error); // Throw specific error from server
      } else {
        throw new Error('An unexpected error occurred'); // Default error message
      }
    } else {
      // If error.response doesn't exist, handle network or unexpected issues
      //console.error('Error:', error);
      throw new Error('Network error or server unreachable. Please try again later.');
    }
  }
};

// Get total balances (for banker)
export const getTotalBalances = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/banker/total-balances`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
