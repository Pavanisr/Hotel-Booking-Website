"use client";

import React, { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        phone,
        password,
      });

      const { user } = response.data;

      // Optionally, automatically login after registration
      const loginRes = await axios.post("/auth/login", {
        email,
        password,
      });
      const { token } = loginRes.data;

      setToken(token);
      setUser({ name: user.name, email: user.email });
      localStorage.setItem("token", token);

      router.push("/"); // redirect to home or dashboard
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f5f5f5" }}
    >
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h3 className="text-center mb-4 fw-bold">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="tel"
              className="form-control rounded-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 rounded-3"
            disabled={loading}
          >
            {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
            Register
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-muted mb-0">
            Already have an account? <a href="/login" className="text-success">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
