const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const app = express();
const auth = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/auth", auth);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "You're now farming" });
});

// Connect to MongoDB then start server
const port = Number(process.env.PORT);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
