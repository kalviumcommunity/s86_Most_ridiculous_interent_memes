const express = require('express');
const router = express.Router();

// Login Endpoint
router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Set cookie with username
  res.cookie('username', username, { httpOnly: true, maxAge: 3600000 }); // 1-hour expiration
  res.status(200).json({ message: 'Login successful', username });
});

// Logout Endpoint
router.post('/logout', (req, res) => {
  // Clear the cookie
  res.clearCookie('username');
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
