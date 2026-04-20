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
      type:      String,
      required:  [true, "Email is required"],
      unique:    true,
      lowercase: true,
      trim:      true,
    },
    password: {
      type:      String,
      required:  [true, "Password is required"],
      minlength: 6,
    },
    bloodGroup: {
      type:     String,
      enum:     ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: [true, "Blood group is required"],
    },
    city: {
      type:     String,
      required: [true, "City is required"],
      trim:     true,
    },
    phone: {
      type: String,
      trim: true,
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
    lastDonation:   { type: Date },
    totalDonations: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ← async সরিয়ে sync করা হয়েছে
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt    = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  return next();
});

// ← async সরিয়ে sync করা হয়েছে
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);