const pool = require("../models/db");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
require("dotenv").config();

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if email exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existingUser.rows.length > 0) 
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, phone)
       VALUES ($1,$2,$3,$4) RETURNING id,name,email`,
      [name, email, hashedPassword, phone]
    );

    res.json({ message: "User registered", user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const validPassword = await comparePassword(password, user.rows[0].password_hash);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { register, login };
