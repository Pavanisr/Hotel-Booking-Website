import React, { useState } from "react";

function Hero() {
  const [city, setCity] = useState("");

  return (
    <div
      className="hero-section d-flex align-items-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "75vh",
        position: "relative",
      }}
    >
      <div
        className="container text-center text-white"
        style={{
          textShadow: "0 3px 8px rgba(0,0,0,0.6)"
        }}
      >
        <h1 className="display-4 fw-bold">
          Unwind in Stunning Resorts, Stay in Elegant Hotels
        </h1>

        <p className="lead mb-5">
          Expert support for a smooth and hassle-free stay experience.
        </p>

        {/* Search Bar Box */}
        <div className="bg-white rounded-4 shadow-lg p-4 mx-auto"
             style={{ maxWidth: "850px" }}>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="City"
                className="form-control rounded-3"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <input type="date" className="form-control rounded-3" />
            </div>

            <div className="col-md-4">
              <button className="btn btn-success w-100 rounded-3">
                Search Hotels
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)"
        }}
      />
    </div>
  );
}

export default Hero;
