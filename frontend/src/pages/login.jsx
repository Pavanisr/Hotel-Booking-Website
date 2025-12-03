import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;

      const success = await login({ token });
      if (success) {
        navigate("/"); // navigate after user is set
      } else {
        setError("Failed to fetch user profile.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
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
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-3" disabled={loading}>
            {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
            Login
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-muted mb-0">
            Don't have an account? <a href="/register" className="text-success">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
