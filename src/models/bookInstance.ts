import { Schema, model, Types } from 'mongoose';

interface IBookInstance {
  book: Types.ObjectId,
  imprint: string,
  status: string,
  due_back?: Date,
  url: string,
  due_back_formatted: string,
}

const bookInstanceSchema = new Schema<IBookInstance>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance',
  },
  due_back: { type: Date, default: Date.now },
});

bookInstanceSchema.virtual('url').get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

bookInstanceSchema.virtual('due_back_formatted').get(function () {
  return this.due_back.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

export default model('BookInstance', bookInstanceSchema);
