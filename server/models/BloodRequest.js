const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "User",
      required: true,
    },
    patientName: {
      type:     String,
      required: [true, "Patient name is required"],
      trim:     true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: [true, "Blood group is required"],
    },
    hospital: {
      type:     String,
      required: [true, "Hospital name is required"],
      trim:     true,
    },
    city: {
      type:     String,
      required: [true, "City is required"],
      trim:     true,
    },
    urgency: {
      type:    String,
      enum:    ["Critical", "Urgent", "Normal"],
      default: "Normal",
    },
    status: {
      type:    String,
      enum:    ["Open", "Closed"],
      default: "Open",
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);