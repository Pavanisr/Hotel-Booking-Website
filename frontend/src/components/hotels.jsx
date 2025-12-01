import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);
  const { user } = useContext(AuthContext);

  // Helper: normalize backend data to a flat hotels array
  const normalizeHotels = (data) => {
    if (!data || data.length === 0) return [];

    if (data[0]?.city && data[0]?.hotels) {
      return data.flatMap((cityData) =>
        cityData.hotels.map((hotel) => ({
          ...hotel,
          photos: hotel.photos && hotel.photos.length > 0 ? hotel.photos : [], // keep empty if no image
        }))
      );
    }

    return data.map((hotel) => ({
      ...hotel,
      photos: hotel.photos && hotel.photos.length > 0 ? hotel.photos : [],
    }));
  };

  // Load all hotels on mount
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

  // Search hotels by city
  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(`/hotels/list?cityCode=${city}`);
      setHotels(normalizeHotels(response.data));
      setVisibleCount(9); // reset visible count
    } catch (err) {
      console.error(err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle hotel booking
  const handleBook = (hotel) => {
    if (!user) {
      alert("Please login to book a hotel");
      return;
    }
    alert(`Booking for ${hotel.name}`);
  };

  // Show more hotels
  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Where Comfort Meets Convenience</h2>
      </div>

      {/* Search bar */}
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

      {/* Loading Skeleton */}
      {loading && (
        <div className="row g-4">
          {[...Array(9)].map((_, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                <div
                  className="bg-secondary placeholder-glow"
                  style={{ height: "220px" }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="placeholder-glow">
                    <span className="placeholder col-7"></span>
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="placeholder col-3 placeholder-glow"></span>
                    <span className="btn btn-outline-success disabled placeholder col-4"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hotel Cards */}
      {!loading && (
        <>
          <div className="row g-4">
            {hotels.slice(0, visibleCount).map((hotel) => (
              <div key={hotel.hotelId} className="col-md-4">
                <div
                  className="card shadow-sm border-0 rounded-4 overflow-hidden"
                  style={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  {/* Hotel Image or Placeholder */}
                  {hotel.photos && hotel.photos.length > 0 ? (
                    <img
                      src={hotel.photos[0].url}
                      className="card-img-top"
                      alt={hotel.name}
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  ) : (
                    <img
                      src="/images/placeholder.jpg"
                      className="card-img-top"
                      alt="placeholder"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body">
                    <h5 className="card-title">{hotel.name}</h5>

                    {hotel.address && (
                      <p className="text-muted mb-2">
                        {hotel.address.cityName},{" "}
                        {hotel.address.lines && hotel.address.lines[0]}
                      </p>
                    )}

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

          {/* See More button */}
          {visibleCount < hotels.length && (
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={handleSeeMore}>
                See More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Hotels;
