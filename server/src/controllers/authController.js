const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerAdmin = async (req, res) => {
  const { name, email, password, setupKey } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (process.env.ADMIN_SETUP_KEY && setupKey !== process.env.ADMIN_SETUP_KEY) {
    return res.status(403).json({ message: 'Invalid admin setup key' });
  }

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(409).json({ message: 'Admin already exists with this email' });
  }

  const user = await User.create({ name, email, password });

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

const getProfile = async (req, res) => {
  return res.json(req.user);
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getProfile,
};
