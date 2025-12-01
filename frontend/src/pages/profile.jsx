import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, token, setUser, setToken } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user bookings
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
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // Cancel booking
  const handleCancel = async (bookingId) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove booking from state
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Profile</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* User Details */}
      <div className="card mb-4 shadow-sm rounded-4 p-4">
        <h5 className="fw-bold">User Details</h5>
        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
      </div>

      {/* User Bookings */}
      <h5 className="fw-bold mb-3">My Bookings</h5>
      {loading && <p>Loading bookings...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && bookings.length === 0 && <p>No bookings found.</p>}

      <div className="row g-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="col-md-6 col-lg-4">
            <div
              className="card shadow-sm rounded-4 overflow-hidden"
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
                <p className="mb-1"><strong>Room:</strong> {booking.room_type}</p>
                <p className="mb-1"><strong>Price:</strong> ${booking.price}</p>
                <p className="mb-1">
                  <strong>Check-in:</strong> {new Date(booking.check_in).toLocaleDateString()}
                </p>
                <p className="mb-1">
                  <strong>Check-out:</strong> {new Date(booking.check_out).toLocaleDateString()}
                </p>
                <button
                  className="btn btn-outline-danger mt-2 w-100"
                  onClick={() => handleCancel(booking.id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
