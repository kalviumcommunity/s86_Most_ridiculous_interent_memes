const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'your_secret_key'; // Replace with a secure secret key

// Login Endpoint
router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  // Set token in cookie
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1-hour expiration
  res.status(200).json({ message: 'Login successful', token });
});

// Logout Endpoint
router.post('/logout', (req, res) => {
  // Clear the cookie
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

// Middleware to Verify Token
router.get('/verify', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: 'Token is valid', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
