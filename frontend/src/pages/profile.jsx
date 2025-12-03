import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Badge, Spinner } from "react-bootstrap";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user bookings
  const fetchBookings = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const res = await axios.get("/bookings/user", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // Cancel booking
  const handleCancel = async (id) => {
    if (!user?.token) return;
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`/bookings/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(bookings.filter((b) => b.id !== id));
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
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* User Details */}
      <div className="card shadow-sm rounded-4 p-4 mb-5">
        <h5 className="fw-bold mb-3">User Details</h5>
        <div className="row">
          <div className="col-md-4 mb-2"><strong>Name:</strong> {user?.name || "N/A"}</div>
          <div className="col-md-4 mb-2"><strong>Email:</strong> {user?.email || "N/A"}</div>
          <div className="col-md-4 mb-2"><strong>Phone:</strong> {user?.phone || "N/A"}</div>
        </div>
      </div>

      {/* Bookings */}
      <h5 className="fw-bold mb-3">My Bookings</h5>
      {loading && <div className="text-center my-5"><Spinner animation="border" variant="success" /></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && bookings.length === 0 && <p>No bookings found.</p>}

      <div className="row g-4">
        {bookings.map((b) => {
          const isPast = new Date(b.check_out) < new Date();
          return (
            <div key={b.id} className="col-md-6 col-lg-4">
              <div className="card booking-card shadow-sm rounded-4 overflow-hidden">
                <img
                  src={b.hotel_image || "/images/placeholder.jpg"}
                  alt={b.hotel_name || "Hotel"}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{b.hotel_name || "Hotel Name N/A"}</h5>
                    <Badge bg={isPast ? "secondary" : "success"}>
                      {isPast ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                  <p className="mb-1"><strong>Room:</strong> {b.room_type || "N/A"}</p>
                  <p className="mb-1"><strong>Price:</strong> ${b.price || "N/A"}</p>
                  <p className="mb-1">
                    <strong>Check-in:</strong> {b.check_in ? new Date(b.check_in).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Check-out:</strong> {b.check_out ? new Date(b.check_out).toLocaleDateString() : "N/A"}
                  </p>
                  {!isPast && (
                    <button
                      className="btn btn-outline-danger mt-3 w-100"
                      onClick={() => handleCancel(b.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Internal CSS */}
      <style>
        {`
          .booking-card {
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .booking-card:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}

export default Profile;
