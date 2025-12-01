const express = require("express");
const router = express.Router();

const {
  listHotelsByCity,
  getHotelOffers,
} = require("../controllers/hotelsController");

// GET hotels with images
router.get("/list", listHotelsByCity);

// GET offers
router.get("/offers", getHotelOffers);

module.exports = router;
