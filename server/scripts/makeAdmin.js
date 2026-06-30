require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const User     = require("../models/User");

const makeAdmin = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI ? "✅ URI found" : "❌ URI not found");
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const email = "smfahim.ahmed28@gmail.com"; 

    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`✅ ${user.name} is now Admin! isAdmin: ${user.isAdmin}`);
    } else {
      console.log("❌ User not found!");
      console.log("Registered users:");
      const all = await User.find().select("email name");
      all.forEach((u) => console.log(`  - ${u.email} (${u.name})`));
    }

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

makeAdmin();