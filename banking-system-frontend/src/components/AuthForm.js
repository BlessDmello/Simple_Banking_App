import React, { useState } from 'react';
import { registerUser, loginUser } from '../api';

const AuthForm = ({ setToken, setRole, role }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer'); // Default role is 'customer'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password, role: selectedRole };

    // Automatically set the role to 'banker' when registering a banker

    try {
      if (isLogin) {
        const data = await loginUser(credentials);
        setToken(data.token); // Save token on successful login
        setRole(data.role); // Save role on successful login
        setError(''); // Clear error if login is successful
        setSuccessMessage(''); // Clear success message on login
      } else {
        const data = await registerUser({ ...credentials });
        setToken(data.token); // Automatically login after registration
        setRole(data.role); // Save role after registration
        setError(''); // Clear error after successful registration
        setSuccessMessage('Registration successful! You are now logged in.'); // Set success message
      }
    } catch (err) {
      setSuccessMessage(''); // Clear success message on error
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Use error message from the backend
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* {!isLogin && (
          <input
            type="text"
            placeholder="Role (e.g., customer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        )} */}
        {!isLogin && (
          <div>
            <label>
              Role:
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
              >
                <option value="customer">Customer</option>
                <option value="banker">Banker</option>
              </select>
            </label>
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => { 
          setIsLogin(!isLogin);
          setError('');
          setSuccessMessage('');
      }}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AuthForm;
