import {Schema, model} from 'mongoose';

const authorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

authorSchema.virtual('name').get(function () {
  return (this.first_name && this.family_name) ? `${this.family_name}, ${this.first_name}` : '';
});

authorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

export default model('Author', authorSchema);
