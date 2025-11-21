// server.js
const express = require("express");
const mysql = require("mysql2"); // Use mysql2 for modern async/await syntax
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// --- 1. MySQL Connection Details ---
const db = mysql.createConnection({
  host: "localhost", // Your MySQL host (usually localhost)
  user: "root", // Your MySQL username
  password: "root", // *** IMPORTANT: Replace with your actual password ***
  database: "user_registration_db", // The database name we created
  port: 3306, // MySQL default port
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + db.threadId);
});
// ------------------------------------

// --- 2. Middleware ---
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // To parse JSON bodies

// --- 3. Registration Route (POST) ---
app.post("/api/register", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const sql = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";

  // Execute the SQL query
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      // Handle common database errors (e.g., duplicate entry for email)
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "This email address is already registered.",
        });
      }
      console.error("MySQL Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error during registration.",
      });
    }

    console.log(`User registered successfully with ID: ${result.insertId}`);
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  });
});

// --- 4. Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
