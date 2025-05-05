require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

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

// Define a schema and model for memes
const memeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Meme = mongoose.model('Meme', memeSchema);

// CRUD Routes directly on app
// Create a new meme
app.post('/api/memes', async (req, res) => {
  try {
    const newMeme = new Meme(req.body);
    await newMeme.save();
    res.status(201).json(newMeme);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all memes
app.get('/api/memes', async (req, res) => {
  try {
    const memes = await Meme.find();
    res.json(memes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific meme
app.get('/api/memes/:id', async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (meme) {
      res.json(meme);
    } else {
      res.status(404).send('Meme not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a meme
app.put('/api/memes/:id', async (req, res) => {
  try {
    const updatedMeme = await Meme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedMeme) {
      res.json(updatedMeme);
    } else {
      res.status(404).send('Meme not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a meme
app.delete('/api/memes/:id', async (req, res) => {
  try {
    const deletedMeme = await Meme.findByIdAndDelete(req.params.id);
    if (deletedMeme) {
      res.status(204).send();
    } else {
      res.status(404).send('Meme not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Set port and start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
