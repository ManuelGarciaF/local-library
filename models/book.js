const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  summary: { type: String, required: true, maxlength: 1000 },
  isbn: { type: String, required: true },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
});

// Virtual for getting a book's url.
BookSchema.virtual('url').get(() => `/catalog/book/${this._id}`);

module.exports = mongoose.model('Book', BookSchema);
