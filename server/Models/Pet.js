import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  category: { type: String, enum: ['dog', 'cat', 'bird', 'rabbit'], required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  status: { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default mongoose.model('Pet', petSchema)