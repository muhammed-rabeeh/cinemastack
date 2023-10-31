import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  movies: {
    type: [String],
  },
});

listSchema.statics.createList = async function(name, user) {
  const match = await this.findOne({ name, user});

  if (match) {
    throw new Error('This list already exists');
  }
  const list = await this.create({ name, user });
  return list;
}

listSchema.statics.add = async function(_id, movieId) {
  const list = await this.findById({ _id });

  if (!list) {
    throw new Error('Invalid list id');
  }

  const updatedList = this.findByIdAndUpdate(
    { _id },
    { $addToSet: { movies: movieId } },
    {new: true},
  )

  return updatedList;
}

export default mongoose.model('List', listSchema);