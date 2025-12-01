import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("/api/hotels").then((res) => setHotels(res.data));
  }, []);

  const handleSearch = () => {
    axios.get(`/api/hotels?city=${city}`).then((res) => setHotels(res.data));
  };

  const handleBook = (hotel) => {
    if (!user) {
      alert("Please login to book a hotel");
      return;
    }
    alert(`Booking for ${hotel.name}`);
  };

  return (
    <div className="container my-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Where Comfort Meets Convenience</h2>
        <button className="btn btn-link">See All</button>
      </div>

      {/* Search bar */}
      <div className="mb-4 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Hotel Cards */}
      <div className="row g-4">
        {hotels.map((hotel) => (
          <div key={hotel.hotelId} className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <img
                src={hotel.imageUrl || "/images/hotel-placeholder.jpg"}
                className="card-img-top"
                alt={hotel.name}
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>

                <p className="text-muted mb-2">
                  {hotel.address.cityName}, {hotel.address.lines[0]}
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
    </div>
  );
}

export default Hotels;
