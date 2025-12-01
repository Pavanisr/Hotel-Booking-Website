"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { format } from "date-fns";

function Bookings() {
  const { user, token } = useContext(AuthContext); // token from login
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const response = await axios.get("/bookings/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  // Cancel a booking
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.delete(`/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b.id !== id));
      alert("Booking cancelled successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">My Bookings</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-success" role="status"></div>
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-muted">You have no bookings yet.</p>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-6 col-lg-4">
              <div
                className="card shadow-sm border-0 rounded-4 overflow-hidden"
                style={{ transition: "transform 0.3s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={booking.hotel_image || "/images/placeholder.jpg"}
                  alt={booking.hotel_name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{booking.hotel_name}</h5>
                  <p className="text-muted mb-1">
                    Room: {booking.room_type}
                  </p>
                  <p className="text-muted mb-1">
                    Price: ${booking.price}/night
                  </p>
                  <p className="text-muted mb-2">
                    {format(new Date(booking.check_in), "MMM dd, yyyy")} -{" "}
                    {format(new Date(booking.check_out), "MMM dd, yyyy")}
                  </p>

                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
