import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../database/models/user'; 
import Image from '../../database/models/image';

export default async function handler(req, res) {
  if (req.method === 'GET') {
const {username} = req.query
console.log(username)
    const users = await User.find({ username });

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = users[0]._id;
    const images = await Image.find({ userId });
    
    const imageData = images.map(image => image.imageData);
    
    console.log(imageData);
    
    return res.status(200).json({ message: 'Images fetched successfully', images: imageData });    
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
