const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
});

GenreSchema.virtual('url').get(() => `/catalog/genre/${this._id}`);

module.exports = mongoose.model('Genre', GenreSchema);
