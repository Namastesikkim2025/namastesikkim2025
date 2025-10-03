const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3200;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the current directory (NAMASTESIKKIM)
app.use(express.static(__dirname));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/namaste_sikkim';
mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Optional: Route for homepage or specific HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbotcode.html')); // change this to your homepage file if needed
});

app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage/homepage.html'));
});
app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage/style.css'));
});

app.get('/culture', (req, res) => {
  res.sendFile(path.join(__dirname, 'cultureandheritage/C&H.html'));
});

app.get('/craft', (req, res) => {
  res.sendFile(path.join(__dirname, 'webpageofartandcraft/art.html'));
});

// API routes
app.use('/api/monasteries', require('./src/routes/monasteries'));


// Start server
app.listen(3200, () => {
  console.log(`Server running at http://localhost:${3200}`);
});
