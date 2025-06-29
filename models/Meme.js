const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true },
});

module.exports = mongoose.model('Meme', memeSchema,'Memes');
