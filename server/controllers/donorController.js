const User = require("../models/User");

// @route  GET /api/donors
const getAllDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    const filter = { isDonor: true, isAvailable: true };

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (city) filter.city = new RegExp(city, "i");

    const donors = await User.find(filter).select("-password");
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/donors/availability
const updateAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isAvailable = req.body.isAvailable;
    await user.save();
    res.json({ message: "Availability updated", isAvailable: user.isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllDonors, updateAvailability };