const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const app = express();
const auth = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const farmRoutes = require("./routes/farmRoutes");
const livestockRoutes = require("./routes/livestockRoutes");
const diagnoseRoutes = require("./routes/diagnoseRoutes");
const newsRoutes = require("./routes/newsRoutes");
const expenseRoutes = require("./routes/expenseRoute");
const saleRoutes = require("./routes/saleRoutes");
const generalTipsRoutes = require("./routes/generalTipsRoutes");
const historyRoutes = require("./routes/historyRoutes");

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Use routes
app.use("/api/auth", auth);
app.use("/api/crop", cropRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/livestock", livestockRoutes);
app.use("/api/diagnose", diagnoseRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/tips", generalTipsRoutes);
app.use("api/history, historyRoutes");

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
