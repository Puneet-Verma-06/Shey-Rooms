const express = require("express")
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');

router.post("/register", async(req,res)=>{
    const newuser = new User({name : req.body.name , email : req.body.email , password : req.body.password})

    try {
         const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

     const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({ name, email, password: hashedPassword });
        const user =  await newuser.save()
        res.send('User Registered Successfully')
    } catch (error) {
        return res.status(400).json({error});
    }
} )

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const temp = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id
        };
        res.send(temp);
      } else {
        return res.status(400).json({ message: 'Login Failed: Incorrect password' });
      }
    } else {
      return res.status(400).json({ message: 'Login Failed: User not found' });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});


// GET all users
router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
