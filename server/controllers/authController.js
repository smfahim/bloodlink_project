const jwt  = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @route  POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, bloodGroup, city, phone, isDonor } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      bloodGroup,
      city,
      phone,
      isDonor,
    });

    res.status(201).json({
      _id:        user._id,
      name:       user.name,
      email:      user.email,
      bloodGroup: user.bloodGroup,
      city:       user.city,
      isDonor:    user.isDonor,
      isAdmin:    user.isAdmin,
      token:      generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id:        user._id,
        name:       user.name,
        email:      user.email,
        bloodGroup: user.bloodGroup,
        city:       user.city,
        isDonor:    user.isDonor,
        isAdmin:    user.isAdmin,
        token:      generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/auth/update          ← নতুন যোগ হয়েছে
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name  = req.body.name  || user.name;
    user.phone = req.body.phone || user.phone;
    user.city  = req.body.city  || user.city;
    user.email = req.body.email || user.email;

    await user.save();

    res.json({
      _id:        user._id,
      name:       user.name,
      email:      user.email,
      bloodGroup: user.bloodGroup,
      city:       user.city,
      phone:      user.phone,
      isDonor:    user.isDonor,
      isAdmin:    user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe, updateProfile };