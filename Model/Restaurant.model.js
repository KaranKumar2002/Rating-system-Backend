import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },

  cuisine: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  averageRating: {
    type: Number,
    default: 0,
  },

  numReviews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const restaurant = mongoose.model('Restaurant', restaurantSchema);
export default restaurant;
