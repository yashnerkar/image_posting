import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../database/models/user'; 
import bcrypt from 'bcrypt';
export default async function loginHandler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(email,password);
      const user = await User.findOne({ email });
      console.log(user);
      const isPassword = bcrypt.compareSync(password,user.password); 
      console.log(isPassword)
      if (!isPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({ message: 'Login successful',userData:user});
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
