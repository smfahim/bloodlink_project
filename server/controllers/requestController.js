const BloodRequest = require("../models/BloodRequest");

// @route  GET /api/requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "Open" })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/requests
const createRequest = async (req, res) => {
  try {
    const { patientName, bloodGroup, hospital, city, urgency, message } = req.body;

    const request = await BloodRequest.create({
      user:        req.user._id,
      patientName,
      bloodGroup,
      hospital,
      city,
      urgency,
      message,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/requests/:id
const updateRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = req.body.status || request.status;
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/requests/:id
const deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.deleteOne();
    res.json({ message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllRequests, createRequest, updateRequest, deleteRequest };