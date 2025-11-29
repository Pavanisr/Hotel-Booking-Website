const Amadeus = require("amadeus");
require("dotenv").config();

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET
});

// SEARCH HOTELS BY CITY
const searchHotels = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: "City code is required" });

    const response = await amadeus.shopping.hotelOffers.get({ cityCode: city });
    res.json(response.data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

// HOTEL DETAILS
const hotelDetails = async (req, res) => {
  try {
    const { hotelId } = req.query;
    if (!hotelId) return res.status(400).json({ message: "Hotel ID is required" });

    const response = await amadeus.shopping.hotelOffersByHotel.get({ hotelId });
    res.json(response.data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch hotel details" });
  }
};

module.exports = { searchHotels, hotelDetails };
