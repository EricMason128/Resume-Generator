const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/profiles', profileRoutes);
app.use('/resume', resumeRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
