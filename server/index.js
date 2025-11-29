const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotels");
const bookingRoutes = require("./routes/bookings");

const app = express();

// 🔹 Middlewares (order matters!)
app.use(cors());
app.use(express.json());             // ← parses JSON request bodies
//app.use(express.urlencoded({ extended: true })); // optional, for form submissions

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// Default route
app.get("/", (req, res) => res.send("Backend running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
