const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  console.log("Registering user with data:", req.body); // Debug log
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({ message: 'User registered successfully' });
};

exports.loginUser = async (req, res) => {
  console.log("Logging in user with data:", req.body); // Debug log
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


