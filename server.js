require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Local)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected on localhost:27017'))
  .catch(err => console.error(err));

// Routes
app.use('/api/feedback', require('./routes/feedbackRoutes'));

app.get('/', (req, res) => {
    res.send('Feedback API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
