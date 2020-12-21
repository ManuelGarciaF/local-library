const mongoose = require('mongoose');

const BookInstanceSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance',
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for getting a book instance's url.
BookInstanceSchema.virtual('url').get(function getUrl() {
  return `/catalog/bookinstance/${this._id}`;
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
