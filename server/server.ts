import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import meetingRoutes from "./routes/meetingRoutes";

// Load environment variables FIRST
dotenv.config();

const app = express();

// Middlewares

app.use(express.json());

// Get Mongo URI safely
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("❌ MONGO_URI is missing in .env file");
}

// MongoDB Connection
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://the-beacon-northstar.netlify.app/"
    ]
  })
);
// Routes
app.use("/api/meetings", meetingRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "The Beacon Backend is running 🚀"
  });
});
// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});