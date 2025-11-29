const pool = require("../models/db");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { hotel_id, hotel_name, room_type, price, check_in, check_out } = req.body;

    const result = await pool.query(
      `INSERT INTO bookings (user_id, hotel_id, hotel_name, room_type, price, check_in, check_out)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [user_id, hotel_id, hotel_name, room_type, price, check_in, check_out]
    );

    res.json({ message: "Booking created", booking: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
};

// GET USER BOOKINGS
const getUserBookings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query("SELECT * FROM bookings WHERE user_id=$1 ORDER BY created_at DESC", [user_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = { createBooking, getUserBookings };
