import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: true,
  },
  imageData: {
    type:Array
  },
})

export default mongoose.models.Image|| mongoose.model('Image', imageSchema);
