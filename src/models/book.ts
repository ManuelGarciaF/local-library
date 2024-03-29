import { Schema, model, Types } from 'mongoose';

interface IBook {
  title: string,
  author: Types.ObjectId,
  summary: string,
  isbn: string,
  genre?: Types.ObjectId[],
  url: string
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

bookSchema.virtual('url').get(function () {
  return `/catalog/book/${this._id}`;
});

export default model('Book', bookSchema);
