const dotenv   = require("dotenv");
dotenv.config(); 
console.log("MONGO_URI:", process.env.MONGO_URI);                     

const express  = require("express");
const cors     = require("cors");
const connectDB = require("./config/db");

connectDB();                         

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/donors",   require("./routes/donorRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "BloodLink API is running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});