const jwt              = require("jsonwebtoken");
const User             = require("../models/User");
const OTP              = require("../models/OTP");
const { sendOTPEmail } = require("../config/email");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route POST /api/auth/register — Send OTP
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      bloodGroup,
      city,
      phone,
      isDonor,
    } = req.body;

    console.log("\n========== REGISTER REQUEST ==========");
    console.log(req.body);

    // Required fields check
    if (!name || !email || !password || !bloodGroup || !city) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Existing user check
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Remove old OTP
    await OTP.deleteMany({ email });

    // Generate OTP
    const otp = generateOTP();

    console.log("Generated OTP:", otp);

    // Save OTP
    await OTP.create({
      email,
      otp,
    });

    console.log("OTP saved successfully.");

    // Send Email
    console.log("Sending OTP email...");

    await sendOTPEmail(email, otp, name);

    console.log("✅ Email sent successfully!");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      email,
    });

  } catch (error) {

    console.log("\n========== REGISTER ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// @route  POST /api/auth/verify-register — Verify OTP + Create Account
const verifyRegister = async (req, res) => {
  try {
    const {
      name, email, password,
      bloodGroup, city, phone,
      isDonor, otp,
    } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await OTP.deleteMany({ email });

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
    console.error("VERIFY REGISTER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/auth/login
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
  verifyRegister,
  loginUser,
  getMe,
  updateProfile,
};