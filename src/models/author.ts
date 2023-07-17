import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

authorSchema.virtual('name').get(function () {
  return (this.first_name && this.family_name) ? `${this.family_name}, ${this.first_name}` : `${this.family_name}${this.first_name}`;
});

authorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

authorSchema.virtual('lifespan').get(function () {
  if (!this.date_of_birth || !this.date_of_death) return '';

  const dob = this.date_of_birth.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', });
  const dod = this.date_of_death.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', });
  return `(${dob} - ${dod})`;
});

export default model('Author', authorSchema);
