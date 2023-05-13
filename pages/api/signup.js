import User from '../../database/models/user';
import connectDB from '../../database/db';
import bcrypt from 'bcrypt'

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    console.log(username,email,password);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    console.log("hashpassword",hashPassword)

    if (!username || !email || !password) {
      return res.status(400).json({ message: ' provide all required fields' });
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({ message: 'User already exists' });
    }
        const newUser = new User({
          username,
          email,
          password:hashPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        return res.status(200).json({ message: 'User created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
