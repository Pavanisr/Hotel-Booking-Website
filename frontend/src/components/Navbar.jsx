import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-success" to="/">
          DeliBook
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/hotels">Hotels</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/contact">Contact</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto gap-3">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-success px-3" to="/login">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success px-3" to="/register">Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle fw-semibold"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {user.name}
                </span>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
