const jwt          = require("jsonwebtoken");
const User         = require("../models/User");
const OTP          = require("../models/OTP");
const { sendOTPEmail } = require("../config/email");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Generate 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route  POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const {
      name, email, password,
      bloodGroup, city, phone, isDonor,
    } = req.body;

    if (!name || !email || !password || !bloodGroup || !city) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({
      name, email, password,
      bloodGroup, city,
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

// @route  POST /api/auth/send-otp
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    // Delete old OTPs for this email
    await OTP.deleteMany({ email });

    // Generate new OTP
    const otp = generateOTP();

    // Save OTP to DB
    await OTP.create({ email, otp });

    // Send email
    await sendOTPEmail(email, otp, user.name);

    return res.json({
      message: "OTP sent successfully",
      email:   email,
    });

  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    return res.status(500).json({ message: "Failed to send OTP. Try again." });
  }
};

// @route  POST /api/auth/verify-otp
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find OTP in DB
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Delete used OTP
    await OTP.deleteMany({ email });

    // Find user and login
    const user = await User.findOne({ email });

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
    console.error("VERIFY OTP ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/auth/login (password login — still works)
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

// @route  GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/auth/update
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

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
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP,
  getMe,
  updateProfile,
};