import { Schema, model } from 'mongoose';

interface IGenre {
  name: string,
  url: string
}

const genreSchema = new Schema<IGenre>({
  name: { type: String, required: true, minLength: 3, maxlength: 100 },
});

genreSchema.virtual('url').get(function () {
  return `/catalog/genre/${this._id}`;
});

export default model('Genre', genreSchema);
