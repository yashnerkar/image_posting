import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  userId: {
    type:String,
  },
  imageData: {
    type:Array
  },
})

export default mongoose.models.Image|| mongoose.model('Image', imageSchema);
