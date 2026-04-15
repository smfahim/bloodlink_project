const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Name is required"],
      trim:     true,
    },
    email: {
      type:     String,
      required: [true, "Email is required"],
      unique:   true,
      lowercase: true,
      trim:     true,
    },
    password: {
      type:     String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: [true, "Blood group is required"],
    },
    city: {
      type:     String,
      required: [true, "City is required"],
      trim:     true,
    },
    phone: {
      type:  String,
      trim:  true,
    },
    isDonor: {
      type:    Boolean,
      default: false,
    },
    isAvailable: {
      type:    Boolean,
      default: true,
    },
    isAdmin: {
      type:    Boolean,
      default: false,
    },
    lastDonation: {
      type: Date,
    },
    totalDonations: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt    = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);