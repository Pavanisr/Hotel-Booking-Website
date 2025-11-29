const express = require("express");
const router = express.Router();
const { createBooking, getUserBookings } = require("../controllers/bookingsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createBooking);
router.get("/user", authMiddleware, getUserBookings);

module.exports = router;
