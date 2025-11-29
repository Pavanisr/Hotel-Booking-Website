const express = require("express");
const router = express.Router();
const { listHotelsByCity, getHotelOffers } = require("../controllers/hotelsController");

// Get hotels in a city
router.get("/list", listHotelsByCity);
// Example: GET /api/hotels/list?cityCode=CMB

// Get hotel offers for selected hotel(s)
router.get("/offers", getHotelOffers);
// Example: GET /api/hotels/offers?hotelIds=HOTELID123&adults=1&checkInDate=2025-12-20&checkOutDate=2025-12-22

module.exports = router;
