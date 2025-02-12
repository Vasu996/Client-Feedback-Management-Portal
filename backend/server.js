import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import fileRoutes from "./routes/fileRoutes.js";



dotenv.config();
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Database Connection
const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// API Routes
app.use("/api/files", fileRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Employee Training Portal Backend");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export GridFS Stream
module.exports = { gfs, conn };
