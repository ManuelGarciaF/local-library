import { Schema, model } from 'mongoose';

const genreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxlength: 100 },
});

genreSchema.virtual('url').get(function () {
  return `/catalog/genre/${this._id}`;
});

export default model('Genre', genreSchema);
