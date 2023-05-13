import { NextApiHandler } from "next";
import formidable from "formidable";
import User from "../../database/models/user";
import Image from "../../database/models/image";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
export const config = {
  api:{
    bodyParser:false,
  }
}

const handler = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    const {username,caption,imageFile} = fields;
    console.log(fields)
    // const fileName =  uuidv4();
    const base64String = imageFile.split(',')[1]; // Remove the data:image/jpeg;base64, part
    const mimetype = imageFile.split(';')[0].slice(5) //images/data
    const imageBufferData = Buffer.from(base64String, 'base64');
    console.log(imageBufferData)
    await fs.promises.writeFile(`public/${fileName}`, imageBufferData)
    const imageDataObj = new Object({
      data : imageBufferData,
      contentType : mimetype,
      caption:caption
    })
    const user = await User.findOne({username});
    console.log(user._id)
    if(user){
      const images = await Image.findOneAndUpdate({
        userId : user._id,
      },{
        $push:{
          imageData:imageDataObj
        }
      })
      await user.updateOne({_id:user._id},{$push:{images:imageDataObj}});
      console.log(user)
      return res.status(200).json({
        message : "Image updated successfully"
      })
      }
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    if(user.images.length > 0){
      return res.status(400).json({ message: 'User already have images' });
    }

    if(user.imageData.length===0){
    const image  = new Image({
      userId : user._id,
      caption : caption,
      image:imageDataObj
    })
    await image.save();
    await user.images.push(image._id);
    await user.save();
    const users = await User.find().populate('images');
    console.log(users);
    return res.status(200).json({ message: 'Image uploaded successfully' });
  }
  });
};

export default handler;