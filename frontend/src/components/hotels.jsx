import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  const { user, token } = useContext(AuthContext);

  // Modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Fetch hotels (same as before)
  const normalizeHotels = (data) => {
    if (!data || data.length === 0) return [];
    if (data[0]?.city && data[0]?.hotels) {
      return data.flatMap((cityData) =>
        cityData.hotels.map((hotel) => ({
          ...hotel,
          photos: hotel.photos && hotel.photos.length > 0 ? hotel.photos : [],
        }))
      );
    }
    return data.map((hotel) => ({
      ...hotel,
      photos: hotel.photos && hotel.photos.length > 0 ? hotel.photos : [],
    }));
  };

  useEffect(() => {
    const defaultCities = ["CMB", "SIN", "BKK", "KUL"];
    const fetchAllHotels = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/hotels/all?cities=${defaultCities.join(",")}`
        );
        setHotels(normalizeHotels(response.data));
      } catch (err) {
        console.error(err);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllHotels();
  }, []);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(`/hotels/list?cityCode=${city}`);
      setHotels(normalizeHotels(response.data));
      setVisibleCount(9);
    } catch (err) {
      console.error(err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  // Open booking modal
  const handleBookNow = (hotel) => {
    if (!user) {
      alert("Please login to book a hotel.");
      return;
    }
    setSelectedHotel(hotel);
    setShowBookingModal(true);
    setCheckIn("");
    setCheckOut("");
    setBookingError("");
  };

  // Submit booking
  const handleConfirmBooking = async () => {
    if (!checkIn || !checkOut) {
      setBookingError("Please select check-in and check-out dates.");
      return;
    }

    setBookingLoading(true);
    try {
      await axios.post(
        "/bookings/create",
        {
          hotel_id: selectedHotel.hotelId,
          hotel_name: selectedHotel.name,
          room_type: "Standard", // could be dynamic if user selects
          price: selectedHotel.price || 200,
          check_in: checkIn,
          check_out: checkOut,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Booking successful!");
      setShowBookingModal(false);
    } catch (err) {
      console.error(err);
      setBookingError("Failed to create booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCloseModal = () => setShowBookingModal(false);

  const handleSeeMore = () => setVisibleCount((prev) => prev + 9);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Where Comfort Meets Convenience</h2>
      </div>

      <div className="mb-4 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by city code (e.g., CMB)"
          value={city}
          onChange={(e) => setCity(e.target.value.toUpperCase())}
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading hotels...</p>
      ) : (
        <>
          <div className="row g-4">
            {hotels.slice(0, visibleCount).map((hotel) => (
              <div key={hotel.hotelId} className="col-md-4">
                <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                  <img
                    src={hotel.photos[0]?.url || "/images/placeholder.jpg"}
                    alt={hotel.name}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p className="text-muted mb-2">
                      {hotel.address?.cityName}, {hotel.address?.lines?.[0]}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="fw-bold text-success">
                        ${hotel.price || 199}/night
                      </span>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleBookNow(hotel)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < hotels.length && (
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={handleSeeMore}>
                See More
              </button>
            </div>
          )}
        </>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedHotel && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1000 }}
        >
          <div className="card p-4 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
            <h5 className="fw-bold mb-3">{selectedHotel.name}</h5>
            <p className="mb-2">{selectedHotel.address?.cityName}</p>

            <div className="mb-3">
              <label className="form-label">Check-in</label>
              <input
                type="date"
                className="form-control"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Check-out</label>
              <input
                type="date"
                className="form-control"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            {bookingError && <div className="alert alert-danger">{bookingError}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleConfirmBooking}
                disabled={bookingLoading}
              >
                {bookingLoading && (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                )}
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hotels;
