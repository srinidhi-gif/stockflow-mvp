const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow any .up.railway.app domain, localhost, or the CLIENT_URL
    const allowed = [
      process.env.CLIENT_URL,
      "http://localhost:5173",
      "http://localhost:3000",
    ].filter(Boolean);
    if (
      allowed.includes(origin) ||
      origin.endsWith(".up.railway.app")
    ) {
      return callback(null, true);
    }
    return callback(null, true); // allow all for MVP
  },
  credentials: true,
}));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "StockFlow Backend Running 🚀" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;