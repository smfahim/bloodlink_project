const express  = require("express");
const router   = express.Router();
const { getAllDonors, updateAvailability } = require("../controllers/donorController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",             getAllDonors);
router.put("/availability", protect, updateAvailability);

module.exports = router;