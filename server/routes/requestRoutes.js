const express  = require("express");
const router   = express.Router();
const {
  getAllRequests,
  createRequest,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",       getAllRequests);
router.post("/",      protect, createRequest);
router.put("/:id",    protect, updateRequest);
router.delete("/:id", protect, deleteRequest);

module.exports = router;