import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Navbar as RBNavbar, Nav, Container, Dropdown, Button } from "react-bootstrap";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <RBNavbar expand="lg" bg="white" className="shadow-sm py-3">
      <Container>
        {/* Brand */}
        <RBNavbar.Brand as={Link} to="/" className="fw-bold fs-3 text-success">
          BookEasy
        </RBNavbar.Brand>

        {/* Mobile toggle */}
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Nav Links */}
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-3">
            <Nav.Link
              as={Link}
              to="/"
              className="fw-semibold nav-link-hover"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/hotels"
              className="fw-semibold nav-link-hover"
            >
              Hotels
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className="fw-semibold nav-link-hover"
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className="fw-semibold nav-link-hover"
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* Right Side */}
          <Nav className="ms-auto gap-3 align-items-center">
            {!user ? (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-success"
                  className="px-3 py-1 fw-semibold"
                >
                  Sign In
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="success"
                  className="px-3 py-1 fw-semibold"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-user"
                  className="d-flex align-items-center border-0 shadow-sm px-2 py-1 rounded-circle hover-shadow"
                  style={{ minWidth: "auto" }}
                >
                  <FaUserCircle size={28} className="text-success" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-sm rounded-3 mt-2">
                  <Dropdown.Item as={Link} to="/profile" className="fw-semibold">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout} className="fw-semibold">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </RBNavbar.Collapse>
      </Container>

      {/* Additional styling */}
      <style>{`
        .nav-link-hover {
          transition: all 0.2s ease-in-out;
        }
        .nav-link-hover:hover {
          color: #28a745 !important;
          text-decoration: underline;
        }
        .hover-shadow:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </RBNavbar>
  );
}

export default Navbar;
