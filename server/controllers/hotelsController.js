const Amadeus = require("amadeus");
require("dotenv").config();

// Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
});

// 1️⃣ List hotels by city
const listHotelsByCity = async (req, res) => {
  try {
    const { cityCode } = req.query;
    if (!cityCode) return res.status(400).json({ message: "cityCode is required" });

    const response = await amadeus.client.get(
      '/v2/reference-data/locations/hotels/by-city',
      { cityCode }
    );

    res.json(response.data);
  } catch (err) {
    console.error("listHotelsByCity error:", err.response ? err.response.data : err);
    res.status(500).json({ error: "Failed to fetch hotels list" });
  }
};

// 2️⃣ Get hotel offers (rooms, prices) by hotel IDs
const getHotelOffers = async (req, res) => {
  try {
    const { cityCode, adults = 1, checkInDate, checkOutDate, roomQuantity = 1 } = req.query;

    if (!cityCode || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "cityCode, checkInDate, and checkOutDate are required" });
    }

    // 1️⃣ Get list of hotels in the city
    const hotelsResponse = await amadeus.client.get('/v2/reference-data/locations/hotels/by-city', { cityCode });
    const hotels = hotelsResponse.data;

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found in this city" });
    }

    // 2️⃣ Try hotel offers one by one until we get results
    let offers = [];
    for (let hotel of hotels) {
      try {
        const params = {
          hotelIds: hotel.hotelId,
          adults,
          checkInDate,
          checkOutDate,
          roomQuantity
        };

        const response = await amadeus.client.get('/v2/shopping/hotel-offers', params);

        if (response.data && response.data.length > 0) {
          offers.push(...response.data);
        }
      } catch (err) {
        // Ignore hotels with no offers (404)
        if (err.code !== 'NotFoundError') {
          console.error(`Error fetching offers for ${hotel.hotelId}:`, err);
        }
      }
    }

    if (offers.length === 0) {
      return res.status(404).json({ message: "No offers available for hotels in this city" });
    }

    res.json(offers);

  } catch (err) {
    console.error("getHotelOffers error full:", err);
    res.status(500).json({ error: "Failed to fetch hotel offers" });
  }
};


module.exports = { listHotelsByCity, getHotelOffers };
