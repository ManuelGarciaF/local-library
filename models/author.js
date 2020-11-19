const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for getting an author's full name.
AuthorSchema.virtual('name').get(() => `${this.first_name} ${this.last_name}`);

// Virtual for getting an author's lifespan.
AuthorSchema.virtual('lifespan').get(() => (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString());

// Virtual for getting an author's url.
AuthorSchema.virtual('url').get(() => `/catalog/author/${this._id}`);

module.exports = mongoose.model('Author', AuthorSchema);
