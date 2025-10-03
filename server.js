const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the current directory (NAMASTESIKKIM)
app.use(express.static(__dirname));

// Optional: Route for homepage or specific HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbotcode.html')); // change this to your homepage file if needed
});

app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage/index.html'));
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


// Start server
app.listen(3200, () => {
  console.log(`Server running at http://localhost:${3200}`);
});
