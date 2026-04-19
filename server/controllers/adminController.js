const User         = require("../models/User");
const BloodRequest = require("../models/BloodRequest");

// @route  GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const totalUsers    = await User.countDocuments();
    const totalDonors   = await User.countDocuments({ isDonor: true });
    const totalRequests = await BloodRequest.countDocuments();
    const openRequests  = await BloodRequest.countDocuments({ status: "Open" });

    // Unique cities
    const cities = await User.distinct("city");

    res.json({
      totalUsers,
      totalDonors,
      totalRequests,
      openRequests,
      citiesCovered: cities.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/admin/requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/admin/requests/:id
const deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.deleteOne();
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/admin/users/:id/toggle
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAvailable = !user.isAvailable;
    await user.save();
    res.json({ message: "User status updated", isAvailable: user.isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStats,
  getAllUsers,
  deleteUser,
  getAllRequests,
  deleteRequest,
  toggleUserStatus,
};