const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true },
  created_by: { type: String, required: true }, // New property
});

module.exports = mongoose.model('Meme', memeSchema);
