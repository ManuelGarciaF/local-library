const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for getting an author's full name.
AuthorSchema.virtual('name').get(function getFullName() {
  return `${this.first_name} ${this.last_name}`;
});

// Virtual for getting an author's lifespan.
AuthorSchema.virtual('lifespan').get(function getLifespan() {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for getting an author's url.
AuthorSchema.virtual('url').get(() => `/catalog/author/${this._id}`);

// Virtual for getting the formatted date of birth.
AuthorSchema.virtual('date_of_birth_formatted').get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : '';
});

// Virtual for getting the formatted date of death.
AuthorSchema.virtual('date_of_death_formatted').get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : '';
});

module.exports = mongoose.model('Author', AuthorSchema);
