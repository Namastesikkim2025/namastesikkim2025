const express = require('express');
const path = require('path');
const app = express();
const PORT = 3200;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Set view engine for dynamic content
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Root route - redirect to homepage for easier navigation
app.get('/', (req, res) => {
  res.redirect('/homepage');
});

// Main homepage route
app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage/index.html'));
});

// Culture and Heritage page
app.get('/culture', (req, res) => {
  res.sendFile(path.join(__dirname, 'cultureandheritage/C&H.html'));
});

// Art and Craft page
app.get('/craft', (req, res) => {
  res.sendFile(path.join(__dirname, 'webpageofartandcraft/art.html'));
});

// Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'cssproject/contactus/contact.html'));
});

// Research page
app.get('/research', (req, res) => {
  res.sendFile(path.join(__dirname, 'cssproject/research/research.html'));
});

// Adventure sports page (from Sanyam folder)
app.get('/adventure', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sanyam/adventure.html'));
});

// Destinations page
app.get('/destinations', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sanyam/destination.html'));
});

// Monasteries page
app.get('/monasteries', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sanyam/monastries.html'));
});

// Paragliding page
app.get('/paragliding', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sanyam/Paragliding.html'));
});

// Geyans page
app.get('/geyans', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sanyam/getans.html'));
});

// Alternative homepages
app.get('/home4', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sanyam/home4.html'));
});

app.get('/index2', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sanyam/index2.html'));
});

// OCR page from homepage folder
app.get('/ocr', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage/ocr.html'));
});

// Translation page
app.get('/translation', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage/trans.html'));
});

// Special route for AI chatbot (alternative to homepage)
app.get('/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbotcode.html'));
});

// Navigation helper page
app.get('/navigation', (req, res) => {
  res.sendFile(path.join(__dirname, 'navigation.html'));
});

// API route to serve site navigation info
app.get('/api/nav', (req, res) => {
  const navigation = {
    pages: [
      { name: 'Home', url: '/' },
      { name: 'Chatbot', url: '/chatbot' },
      { name: 'Homepage', url: '/homepage' },
      { name: 'Culture & Heritage', url: '/culture' },
      { name: 'Art & Craft', url: '/craft' },
      { name: 'Adventure Sports', url: '/adventure' },
      { name: 'Destinations', url: '/destinations' },
      { name: 'Monasteries', url: '/monasteries' },
      { name: 'Paragliding', url: '/paragliding' },
      { name: 'Contact', url: '/contact' },
      { name: 'Research', url: '/research' },
      { name: 'OCR Tool', url: '/ocr' },
      { name: 'Translation', url: '/translation' },
      { name: 'Alternative Home', url: '/index2' }
    ],
    baseUrl: `http://localhost:${PORT}`
  };
  res.json(navigation);
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <ul style="list-style-type: none; padding: 0;">
      <li><a href="/" style="text-decoration: none; color: #007bff;">🏠 Home</a></li>
      <li><a href="/homepage" style="text-decoration: none; color: #007bff;">🏔️ Homepage</a></li>
      <li><a href="/culture" style="text-decoration: none; color: #007bff;">🏛️ Culture & Heritage</a></li>
      <li><a href="/craft" style="text-decoration: none; color: #007bff;">🎨 Art & Craft</a></li>
      <li><a href="/adventure" style="text-decoration: none; color: #007bff;">⛰️ Adventure</a></li>
      <li><a href="/destinations" style="text-decoration: none; color: #007bff;">🌄 Destinations</a></li>
      <li><a href="/monasteries" style="text-decoration: none; color: #007bff;">🕌 Monasteries</a></li>
      <li><a href="/contact" style="text-decoration: none; color: #007bff;">📞 Contact</a></li>
      <li><a href="/research" style="text-decoration: none; color: #007bff;">🔬 Research</a></li>
    </ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📍 Main entry point: http://localhost:${PORT}`);
  console.log(`📋 Navigation API: http://localhost:${PORT}/api/nav`);
  console.log('\n🎯 Available Pages:');
  console.log('   • Home: http://localhost:3200/');
  console.log('   • Homepage: http://localhost:3200/homepage');
  console.log('   • Culture: http://localhost:3200/culture');
  console.log('   • Craft: http://localhost:3200/craft');
  console.log('   • Adventure: http://localhost:3200/adventure');
  console.log('   • Destinations: http://localhost:3200/destinations');
  console.log('   • Monasteries: http://localhost:3200/monasteries');
  console.log('   • Contact: http://localhost:3200/contact');
  console.log('   • Research: http://localhost:3200/research');
});