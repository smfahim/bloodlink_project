const express = require("express");
const router  = express.Router();
const {
  getStats,
  getAllUsers,
  deleteUser,
  getAllRequests,
  deleteRequest,
  toggleUserStatus,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// All routes protected + admin only
router.get("/stats",            protect, adminOnly, getStats);
router.get("/users",            protect, adminOnly, getAllUsers);
router.delete("/users/:id",     protect, adminOnly, deleteUser);
router.get("/requests",         protect, adminOnly, getAllRequests);
router.delete("/requests/:id",  protect, adminOnly, deleteRequest);
router.put("/users/:id/toggle", protect, adminOnly, toggleUserStatus);

module.exports = router;