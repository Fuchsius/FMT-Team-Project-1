const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },            // e.g. "book1.jpg"
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  isOnSale: { type: Boolean, default: false }
});

// Prevent model overwrite on hot reloads (in dev)
module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);
