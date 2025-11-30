import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("/hotels").then(res => setHotels(res.data));
  }, []);

  const handleSearch = () => {
    axios.get(`/hotels?city=${city}`).then(res => setHotels(res.data));
  };

  const handleBook = (hotel) => {
    if (!user) {
      alert("Please login to book a hotel");
      return;
    }
    // Navigate to booking page or handle booking
    alert(`Booking for ${hotel.name}`);
  };

  return (
    <div className="container my-5">
      <h2>Hotels</h2>
      <div className="mb-3 d-flex">
        <input type="text" className="form-control me-2" placeholder="Search by city" value={city} onChange={e => setCity(e.target.value)} />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      <div className="row">
        {hotels.map(hotel => (
          <div key={hotel.hotelId} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="card-text">{hotel.address.cityName}, {hotel.address.lines[0]}</p>
                <button className="btn btn-success" onClick={() => handleBook(hotel)}>Book</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
