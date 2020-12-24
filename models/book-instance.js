const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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

// Virtual for getting a formatted due date.
BookInstanceSchema.virtual('due_back_formatted').get(function getFormattedDate() {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
