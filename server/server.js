const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express   = require("express");
const cors      = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://bloodlink-project-two.vercel.app",
    /\.vercel\.app$/,
  ],
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/donors",   require("./routes/donorRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/admin",    require("./routes/adminRoutes"));

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);
  res.status(500).json({ message: err.message });
});

app.get("/", (req, res) => {
  res.json({ message: "BloodLink API is running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});