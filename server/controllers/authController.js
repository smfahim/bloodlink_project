const jwt  = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const {
      name, email, password,
      bloodGroup, city, phone, isDonor,
    } = req.body;

    // Validate
    if (!name || !email || !password || !bloodGroup || !city) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({
      name,
      email,
      password,
      bloodGroup,
      city,
      phone:   phone   || "",
      isDonor: isDonor || false,
    });

    await user.save();

    return res.status(201).json({
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
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
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
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.json(user);
  } catch (error) {
    console.error("GETME ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name  = req.body.name  || user.name;
    user.phone = req.body.phone || user.phone;
    user.city  = req.body.city  || user.city;
    user.email = req.body.email || user.email;

    await user.save();

    return res.json({
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
    console.error("UPDATE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe, updateProfile };