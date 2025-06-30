const express = require('express');
const router = express.Router();
const Meme = require('./models/Meme'); 
const User = require('..  /models/User');// Import the Meme model

// Create a new meme
const { body, validationResult } = require('express-validator');

router.post(
  '/memes',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('video').isURL().withMessage('Video must be a valid URL'),
    body('created_by').notEmpty().withMessage('Creator is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newMeme = new Meme(req.body);
      await newMeme.save();
      res.status(201).json(newMeme);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all memes
router.get('/memes', async (req, res) => {
  const { created_by } = req.query;
  try {
    const memes = created_by
      ? await Meme.find({ created_by }) // Filter by creator
      : await Meme.find(); // Return all memes
    res.json(memes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Read a specific meme by ID
router.get('/memes/:id', async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id); // Fetch a Meme document by its ID
    if (meme) {
      res.json(meme); // Respond with the fetched document
    } else {
      res.status(404).send('Meme not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific meme by ID
router.put('/memes/:id', async (req, res) => {
  try {
    const updatedMeme = await Meme.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are run on updates
    });
    if (updatedMeme) {
      res.json(updatedMeme); // Respond with the updated document
    } else {
      res.status(404).send('Meme not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a specific meme by ID
router.delete('/memes/:id', async (req, res) => {
  try {
    const deletedMeme = await Meme.findByIdAndDelete(req.params.id); // Delete the Meme document by its ID
    if (deletedMeme) {
      res.status(204).send(); // Respond with no content
    } else {
      res.status(404).send('Meme not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
