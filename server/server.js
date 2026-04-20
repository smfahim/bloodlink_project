const dotenv    = require("dotenv");
dotenv.config();

const express   = require("express");
const cors      = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://bloodlink-project-two.vercel.app",
    /\.vercel\.app$/,
  ],
  credentials: true,
}));

app.use(express.json());

// Test route
app.post("/api/test", (req, res) => {
  res.json({ message: "Test works!", body: req.body });
});

// Routes
app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/donors",   require("./routes/donorRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/admin",    require("./routes/adminRoutes"));

// Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);
  res.status(500).json({ message: err.message });
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "BloodLink API is running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});