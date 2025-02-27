const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    category: [String],
    priority: [String],
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
