const Amadeus = require("amadeus");
require("dotenv").config();

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// ----------------------------------------------------
// 🔥 Helper to fetch hotel images
// ----------------------------------------------------
async function getHotelImages(hotelId) {
  try {
    const response = await amadeus.get(
      `/v1/reference-data/locations/hotels/${hotelId}/photos`
    );

    if (!response.data || response.data.length === 0) {
      return []; // no images
    }

    return response.data.map((img) => img.url);
  } catch (err) {
    console.log(`❌ Failed to load images for ${hotelId}`);
    return []; // Return empty to avoid breaking app
  }
}

// ----------------------------------------------------
// 1️⃣ LIST HOTELS WITH IMAGES
// ----------------------------------------------------
const listHotelsByCity = async (req, res) => {
  try {
    const { cityCode } = req.query;

    if (!cityCode) {
      return res.status(400).json({ message: "cityCode is required" });
    }

    // Get hotels
    const response =
      await amadeus.referenceData.locations.hotels.byCity.get({ cityCode });

    const hotels = response.data;

    // If no hotels
    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found in this city" });
    }

    // Fetch images for each hotel (parallel)
    const hotelsWithImages = await Promise.all(
      hotels.map(async (hotel) => {
        const images = await getHotelImages(hotel.hotelId);

        return {
          ...hotel,
          images: images.length > 0 ? images : [
            "https://via.placeholder.com/600x400?text=No+Image+Available"
          ],
        };
      })
    );

    res.json(hotelsWithImages);
  } catch (err) {
    console.error(
      "listHotelsByCity error:",
      err.response ? err.response.data : err
    );
    res.status(500).json({ error: "Failed to fetch hotels list" });
  }
};

// ----------------------------------------------------
// 2️⃣ HOTEL OFFERS
// ----------------------------------------------------
const getHotelOffers = async (req, res) => {
  try {
    const {
      cityCode,
      adults = 1,
      checkInDate,
      checkOutDate,
      roomQuantity = 1,
    } = req.query;

    if (!cityCode || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        message: "cityCode, checkInDate, and checkOutDate are required",
      });
    }

    const hotelsRes =
      await amadeus.referenceData.locations.hotels.byCity.get({ cityCode });

    const hotels = hotelsRes.data;

    let offers = [];

    await Promise.all(
      hotels.map(async (hotel) => {
        try {
          const response = await amadeus.shopping.hotelOffersSearch.get({
            hotelIds: hotel.hotelId,
            adults,
            checkInDate,
            checkOutDate,
            roomQuantity,
          });

          if (response.data && response.data.length > 0) {
            offers.push(...response.data);
          }
        } catch (err) {
          console.log(`Offer error for ${hotel.hotelId}`);
        }
      })
    );

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
