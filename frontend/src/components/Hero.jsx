import React from "react";

function Hero() {
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
      </div>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.25)",
          color:"white"
        }}
      />
    </div>
  );
}

export default Hero;
