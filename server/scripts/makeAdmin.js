const mongoose = require("mongoose");
const dotenv   = require("dotenv");
const User     = require("../models/User");

dotenv.config({ path: "../.env" });

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // তোমার registered email দাও
    const email = "your-email@gmail.com";

    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`✅ ${user.name} is now an Admin!`);
    } else {
      console.log("❌ User not found. Register first!");
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

makeAdmin();