const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Health check
app.get("/", (req, res) => {
  res.json({ message: "You're now farming" });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
