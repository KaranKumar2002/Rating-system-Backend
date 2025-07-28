import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  
  _id: {
    type:String,
   required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
  },
}, {
  timestamps: true,
});

const user = mongoose.model('User', userSchema);
export default user;
