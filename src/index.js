const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();  // Add this line

const app = express();

app.use(cors());
app.use(express.json());

// Used .env for connection string
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('MongoDB connection error:', error));

const travelPlanRoutes = require('./routes/travelPlanRoutes');
app.use('/plans', travelPlanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});