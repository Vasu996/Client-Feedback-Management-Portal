const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Feedback Schema
const FeedbackSchema = new mongoose.Schema({
    category: [String],
    priority: [String],
    details: String
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

// Save feedback (Client submits feedback)
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: "Feedback saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save feedback." });
    }
});

// Get all feedback (Admin retrieves feedback)
app.get("/api/feedback", async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve feedback." });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
