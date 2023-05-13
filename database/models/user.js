import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 images: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
  ],
});


export default mongoose.models.User || mongoose.model('User', userSchema);
