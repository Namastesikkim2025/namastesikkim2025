# 🏔️ Namaste Sikkim Tourism Website

Welcome to the Namaste Sikkim tourism website! This is a comprehensive Express.js application showcasing various aspects of Sikkim tourism.

## 🚀 Quick Start

### Prerequisites
- Node.js installed on your system
- All dependencies have been installed

### Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```
   Or alternatively:
   ```bash
   node server.js
   ```

2. **Access the website:**
   - Open your browser and go to: `http://localhost:3200`
   - The server will display all available routes in the console

## 📍 Available Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Main chatbot page |
| 🤖 Chatbot | `/chatbot` | AI chatbot interface |
| 🏔️ Homepage | `/homepage` | Main homepage |
| 🏛️ Culture & Heritage | `/culture` | Cultural information |
| 🎨 Art & Craft | `/craft` | Art and craft showcase |
| ⛰️ Adventure Sports | `/adventure` | Adventure activities |
| 🌄 Destinations | `/destinations` | Tourist destinations |
| 🕌 Monasteries | `/monasteries` | Monastery information |
| 🪂 Paragliding | `/paragliding` | Paragliding details |
| 📝 Geyans | `/geyans` | Geyans section |
| 📞 Contact | `/contact` | Contact information |
| 🔬 Research | `/research` | Research content |
| 📄 OCR Tool | `/ocr` | OCR functionality |
| 🌐 Translation | `/translation` | Translation tools |
| 🏡 Alternative Home | `/index2` | Alternative homepage |

## 🧭 Navigation API

Access navigation information via: `http://localhost:3200/api/nav`

This returns JSON data with all available pages and their routes.

## 📁 Project Structure

```
NamasteSikkim/
├── server.js                 # Main server file
├── package.json             # Dependencies and scripts
├── navigation.html          # Navigation component
├── chatbotcode.html         # Main entry page
├── homepage/               # Main homepage files
├── tradition/              # Traditional information
├── craft/                  # Art and craft pages
├── places/                 # Places to visit
├── cssproject/             # Contact and research pages
├── cultureandheritage/     # Culture section
├── webpageofartandcraft/   # Art craft section
└── Sanyam/                # Adventure and additional pages
```

## 🛠️ Technologies Used

- **Backend:** Express.js
- **Static Files:** HTML, CSS, JavaScript
- **Template Engine:** EJS (for dynamic content)
- **Node.js** for server runtime

## 🔧 Development

- **Port:** 3200
- **Static files:** Served from root directory
- **Error handling:** Custom 404 page with navigation

## 📝 Adding New Pages

1. Add your HTML page to the appropriate folder
2. Create a route in `server.js`:
   ```javascript
   app.get('/yourroute', (req, res) => {
     res.sendFile(path.join(__dirname, 'folder/yourpage.html'));
   });
   ```
3. Start the server to test: `npm start`

## 🎯 Next Steps

- Visit `http://localhost:3200` to start exploring!
- Use the navigation links to browse between pages
- Test all routes to ensure everything works properly

---

**Happy Coding! 🎉**
