import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function About() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px",
        background: "#e6e6e6",
        gap: "40px",
      }}
    >
      {/* LEFT SIDE TEXT */}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "15px" }}>
          ABOUT US
        </h2>

        <p style={{ color: "gray", marginBottom: "15px" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>

        <p style={{ color: "#444", lineHeight: "1.6", maxWidth: "500px" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <button
          style={{
            background: "#333",
            color: "white",
            padding: "10px 25px",
            border: "none",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Read More
        </button>

        {/* SOCIAL ICONS */}
        <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
          <i className="fab fa-facebook" style={{ fontSize: "22px", cursor: "pointer" }}></i>
          <i className="fab fa-twitter" style={{ fontSize: "22px", cursor: "pointer" }}></i>
          <i className="fab fa-instagram" style={{ fontSize: "22px", cursor: "pointer" }}></i>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div>
        <img
          src="/images/about.jpg"
          alt="About"
          style={{ width: "420px", borderRadius: "6px" }}
        />
      </div>
    </div>
  );
}

export default About;
