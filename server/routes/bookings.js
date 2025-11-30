const express = require("express");
const router = express.Router();
const { 
  createBooking, 
  getUserBookings, 
  getBookingById, 
  cancelBooking 
} = require("../controllers/bookingsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createBooking);
router.get("/user", authMiddleware, getUserBookings);

// New ones
router.get("/:id", authMiddleware, getBookingById);
router.delete("/:id", authMiddleware, cancelBooking);

module.exports = router;
