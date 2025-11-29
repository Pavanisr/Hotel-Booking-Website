const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./models/db"); // PostgreSQL connection

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Server is running 🚀 Database time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send("Database error: " + err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
