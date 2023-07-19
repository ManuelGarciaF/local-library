import { Schema, model } from 'mongoose';

interface IAuthor {
  first_name: string,
  family_name: string,
  date_of_birth?: Date,
  date_of_death?: Date,
  url: string,
  name: string,
  lifespan: string,
  date_of_birth_formatted: string,
  date_of_death_formatted: string,
}

const authorSchema = new Schema<IAuthor>({
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

authorSchema.virtual('date_of_birth_formatted').get(function () {
  if (!this.date_of_birth) return '';
  return this.date_of_birth.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', });
});

authorSchema.virtual('date_of_death_formatted').get(function () {
  if (!this.date_of_death) return '';
  return this.date_of_death.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', });
});

export default model('Author', authorSchema);
