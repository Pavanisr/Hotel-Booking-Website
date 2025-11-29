const express = require("express");
const router = express.Router();
const { searchHotels, hotelDetails } = require("../controllers/hotelsController");

router.get("/search", searchHotels);
router.get("/details", hotelDetails);

module.exports = router;
