const express = require("express");
const router = express.Router();

const {
  listHotelsByCity,
  getHotelOffers,
  getAllHotels,
} = require("../controllers/hotelsController");

// GET hotels with images
router.get("/list", listHotelsByCity);

// GET offers
router.get("/offers", getHotelOffers);

// Example: /api/hotels/all?cities=CMB,DXB,SIN
router.get("/all", getAllHotels);

module.exports = router;
