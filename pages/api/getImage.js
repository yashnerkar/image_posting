import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../database/models/user'; 
import Image from '../../database/models/image';


const handler= async(req, res)=> {
  if (req.method === 'GET') {
    console.log("hello")
    const { username } = req.query;
    // const { username } = req.query;
    const user = await User.findOne({ username });
    console.log(user._id)
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const images = await Image.find({ userId:user._id});
    // console.log(images)
    const imageData = images.map(image => image.imageData);
    // console.log(imageData)
    return res.status(200).json({ message: 'Images fetched successfully', images: imageData });    
  } 
}
export default handler;