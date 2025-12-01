import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleBook = (hotel) => {
    if (!user) {
      setShowLoginPrompt(true); // Show login prompt
      return;
    }
    // Navigate to bookings page for logged-in users
    navigate("/bookings");
  };

  const handleSeeMore = () => setVisibleCount((prev) => prev + 9);

  const closePrompt = () => setShowLoginPrompt(false);

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
                    src={
                      hotel.photos[0]?.url || "/images/placeholder.jpg"
                    }
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
                        onClick={() => handleBook(hotel)}
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

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1000 }}
        >
          <div className="card p-4 rounded-4" style={{ maxWidth: "400px" }}>
            <h5 className="fw-bold mb-3">Login Required</h5>
            <p>You must be logged in to book a hotel.</p>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={closePrompt}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hotels;
