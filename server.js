require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import the routes.js file

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  });

// Use routes from routes.js
app.use('/api', routes); // Prefix all routes with /api

// Home route to display DB connection status
app.get('/', (req, res) => {
  const status = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.send(`Database connection status: ${status}`);
});

// Set port and start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
