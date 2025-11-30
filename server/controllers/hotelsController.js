const Amadeus = require("amadeus");
require("dotenv").config();

// Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
});

// ----------------------------------------------------
// 1️⃣ List hotels by city
// ----------------------------------------------------
const listHotelsByCity = async (req, res) => {
  try {
    const { cityCode } = req.query;
    if (!cityCode) {
      return res.status(400).json({ message: "cityCode is required" });
    }

    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode
    });

    res.json(response.data);
  } catch (err) {
    console.error(
      "listHotelsByCity error:",
      err.response ? err.response.data : err
    );
    res.status(500).json({ error: "Failed to fetch hotels list" });
  }
};

// ----------------------------------------------------
// 2️⃣ Get hotel offers (rooms + pricing)
// ----------------------------------------------------
const getHotelOffers = async (req, res) => {
  try {
    const {
      cityCode,
      adults = 1,
      checkInDate,
      checkOutDate,
      roomQuantity = 1
    } = req.query;

    if (!cityCode || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        message: "cityCode, checkInDate, and checkOutDate are required"
      });
    }

    // 1️⃣ Get hotels in the city
    const hotelsResponse =
      await amadeus.referenceData.locations.hotels.byCity.get({
        cityCode
      });

    const hotels = hotelsResponse.data;

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found in this city" });
    }

    let offers = [];

    // 2️⃣ Get offers for each hotel
    for (let hotel of hotels) {
      try {
        const params = {
          hotelIds: hotel.hotelId,
          adults,
          checkInDate,
          checkOutDate,
          roomQuantity
        };

        // ⭐ Correct method for hotel offers
        const response = await amadeus.shopping.hotelOffersSearch.get(params);

        if (response.data && response.data.length > 0) {
          offers.push(...response.data);
        }
      } catch (err) {
        console.error(
          `Error fetching offers for ${hotel.hotelId}:`,
          err.response?.data || err.message
        );
      }
    }

    if (offers.length === 0) {
      return res.status(404).json({ message: "No offers available" });
    }

    res.json(offers);
  } catch (err) {
    console.error("getHotelOffers error:", err);
    res.status(500).json({ error: "Failed to fetch hotel offers" });
  }
};

module.exports = { listHotelsByCity, getHotelOffers };
