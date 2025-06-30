import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { username }, { withCredentials: true });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error logging in.');
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error logging out.');
      console.error(error);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/verify', { withCredentials: true });
      setMessage(`Token is valid. User: ${response.data.user.username}`);
    } catch (error) {
      setMessage('Error verifying token.');
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">JWT Authentication</h1>

      {/* Login Form */}
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
        Logout
      </button>
      <button onClick={handleVerify} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
        Verify Token
      </button>

      {/* Message */}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Auth;
