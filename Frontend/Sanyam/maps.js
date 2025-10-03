// Sikkim destinations data
const sikkimDestinations = [
  {
    "name": "Gangtok",
    "description": "The capital city of Sikkim, offering stunning views of Kanchenjunga and vibrant MG Marg",
    "latitude": 27.325,
    "longitude": 88.612,
    "district": "East Sikkim",
    "elevation": "1,650 m",
    "highlights": ["MG Marg", "Rumtek Monastery", "Enchey Monastery", "Tashi Viewpoint"],
    "best_time": "March to June, September to December"
  },
  {
    "name": "Tsomgo Lake",
    "description": "A glacial lake at 12,400 ft, one of the highest lakes in India, frozen in winters",
    "latitude": 27.386,
    "longitude": 88.757,
    "district": "East Sikkim", 
    "elevation": "3,780 m",
    "highlights": ["Yak rides", "Frozen lake in winter", "Sacred to Buddhists", "Panoramic mountain views"],
    "best_time": "April to June, September to December"
  },
  {
    "name": "Nathula Pass",
    "description": "Historic border pass with China at 14,140 ft, part of ancient Silk Route",
    "latitude": 27.391,
    "longitude": 88.841,
    "district": "East Sikkim",
    "elevation": "4,310 m", 
    "highlights": ["India-China border", "War memorial", "Historic Silk Route", "Mountain views"],
    "best_time": "May to October"
  },
  {
    "name": "Pelling",
    "description": "Scenic hill station with spectacular views of Kanchenjunga and ancient monasteries",
    "latitude": 27.18,
    "longitude": 88.14,
    "district": "West Sikkim",
    "elevation": "2,150 m",
    "highlights": ["Kanchenjunga views", "Pemayangtse Monastery", "Skywalk", "Khecheopalri Lake"],
    "best_time": "March to June, September to December"
  },
  {
    "name": "Yuksom",
    "description": "First capital of Sikkim and gateway to Kanchenjunga, base for trekking",
    "latitude": 27.367,
    "longitude": 88.217,
    "district": "West Sikkim",
    "elevation": "1,780 m",
    "highlights": ["First capital", "Dubdi Monastery", "Norbugang Chorten", "Trekking base"],
    "best_time": "March to June, September to November"
  },
  {
    "name": "Gurudongmar Lake",
    "description": "One of highest lakes in world at 17,800 ft, sacred to multiple religions",
    "latitude": 28.024,
    "longitude": 88.710,
    "district": "North Sikkim",
    "elevation": "5,430 m",
    "highlights": ["High altitude lake", "Sacred lake", "Never fully freezes", "Curative properties"],
    "best_time": "April to June"
  },
  {
    "name": "Yumthang Valley",
    "description": "Valley of Flowers with hot springs and alpine meadows",
    "latitude": 27.815,
    "longitude": 88.708,
    "district": "North Sikkim", 
    "elevation": "3,564 m",
    "highlights": ["Valley of Flowers", "Hot springs", "Rhododendrons", "Alpine meadows"],
    "best_time": "April to June"
  },
  {
    "name": "Lachung",
    "description": "Picturesque mountain village and gateway to Yumthang Valley",
    "latitude": 27.719,
    "longitude": 88.746,
    "district": "North Sikkim",
    "elevation": "2,750 m",
    "highlights": ["Mountain village", "Apple orchards", "Traditional architecture", "Gateway to Yumthang"],
    "best_time": "March to June, September to December"
  },
  {
    "name": "Ravangla",
    "description": "Peaceful town with Buddha Park and panoramic Himalayan views",
    "latitude": 27.307,
    "longitude": 88.364,
    "district": "South Sikkim",
    "elevation": "2,100 m", 
    "highlights": ["Buddha Park", "130-foot Buddha statue", "Tea gardens", "Maenam Wildlife Sanctuary"],
    "best_time": "March to June, September to December"
  },
  {
    "name": "Zuluk",
    "description": "Offbeat village on Old Silk Route with serpentine roads and sunrise views",
    "latitude": 27.101,
    "longitude": 88.869,
    "district": "East Sikkim",
    "elevation": "3,048 m",
    "highlights": ["Old Silk Route", "Serpentine roads", "Thambi View Point", "Sunrise views"],
    "best_time": "March to May, September to December"
  }
];

// Global variables
let mainMap = null;
let currentDestinations = [...sikkimDestinations];
let destinationMarkers = [];
let isMapInitialized = false;

// Wait for both DOM and Leaflet to be ready
function initializeApp() {
    console.log('Initializing Sikkim Explorer App...');
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        setTimeout(initializeApp, 100);
        return;
    }
    
    try {
        initializeMainMap();
        renderDestinations();
        setupEventListeners();
        setupSmoothScrolling();
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Initialize the main interactive map
function initializeMainMap() {
    console.log('Initializing main map...');
    
    const mapElement = document.getElementById('main-map');
    if (!mapElement) {
        console.error('Map element not found');
        return;
    }
    
    try {
        // Initialize map centered on Sikkim
        mainMap = L.map('main-map', {
            center: [27.533, 88.512],
            zoom: 9,
            zoomControl: true
        });
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            crossOrigin: true
        }).addTo(mainMap);
        
        // Wait a bit for map to initialize, then add markers
        setTimeout(() => {
            addDestinationMarkers();
            isMapInitialized = true;
            console.log('Map initialized with markers');
        }, 500);
        
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Add markers for all destinations
function addDestinationMarkers() {
    if (!mainMap) {
        console.error('Map not initialized');
        return;
    }
    
    destinationMarkers = [];
    
    sikkimDestinations.forEach((destination, index) => {
        try {
            const marker = L.marker([destination.latitude, destination.longitude])
                .addTo(mainMap)
                .bindPopup(createPopupContent(destination));
            
            marker.on('click', function() {
                highlightDestination(index);
            });
            
            destinationMarkers.push(marker);
        } catch (error) {
            console.error('Error adding marker for', destination.name, error);
        }
    });
    
    console.log(`Added ${destinationMarkers.length} markers to map`);
}

// Create popup content for map markers
function createPopupContent(destination) {
    return `
        <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: var(--color-primary);">${destination.name}</h3>
            <p style="margin: 4px 0;"><strong>District:</strong> ${destination.district}</p>
            <p style="margin: 4px 0;"><strong>Elevation:</strong> ${destination.elevation}</p>
            <p style="margin: 4px 0;"><strong>Best Time:</strong> ${destination.best_time}</p>
            <p style="margin: 8px 0;">${destination.description}</p>
            <button onclick="window.openDestinationModal('${destination.name}')" 
                    class="btn btn--primary btn--small" 
                    style="margin-top: 8px; padding: 4px 12px; font-size: 12px;">
                View Details
            </button>
        </div>
    `;
}

// Render destination cards
function renderDestinations() {
    console.log('Rendering destinations...');
    
    const grid = document.getElementById('destinations-grid');
    if (!grid) {
        console.error('Destinations grid element not found');
        return;
    }
    
    grid.innerHTML = '';
    
    if (currentDestinations.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--color-text-secondary);">No destinations found matching your criteria.</p>';
        return;
    }
    
    currentDestinations.forEach((destination, index) => {
        const card = createDestinationCard(destination, index);
        grid.appendChild(card);
    });
    
    console.log(`Rendered ${currentDestinations.length} destination cards`);
}

// Create individual destination card
function createDestinationCard(destination, index) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.setAttribute('data-district', destination.district);
    card.setAttribute('data-name', destination.name.toLowerCase());
    
    const originalIndex = sikkimDestinations.findIndex(d => d.name === destination.name);
    
    card.innerHTML = `
        <div class="destination-header">
            <h3 class="destination-title">${destination.name}</h3>
            <div class="destination-meta">
                <span class="meta-item">📍 ${destination.district}</span>
                <span class="meta-item">⛰️ ${destination.elevation}</span>
            </div>
            <p class="destination-description">${destination.description}</p>
        </div>
        
        <div class="destination-content">
            <div class="highlights-section">
                <h4 class="highlights-title">Highlights</h4>
                <ul class="highlights-list">
                    ${destination.highlights.map(highlight => 
                        `<li class="highlight-item">${highlight}</li>`
                    ).join('')}
                </ul>
            </div>
        </div>
        
        <div class="destination-footer">
            <div class="best-time">
                <strong>Best Time:</strong> ${destination.best_time}
            </div>
            <div class="destination-actions">
                <button class="btn btn--outline btn--small view-on-map-btn" data-index="${originalIndex}">
                    View on Map
                </button>
                <button class="btn btn--primary btn--small details-btn" data-name="${destination.name}">
                    Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// View destination on map
function viewOnMap(index) {
    if (!mainMap || !isMapInitialized) {
        console.error('Map not initialized');
        return;
    }
    
    const destination = sikkimDestinations[index];
    if (!destination) {
        console.error('Destination not found at index', index);
        return;
    }
    
    try {
        mainMap.setView([destination.latitude, destination.longitude], 13);
        if (destinationMarkers[index]) {
            destinationMarkers[index].openPopup();
        }
        
        // Smooth scroll to map section
        const mapSection = document.getElementById('map-section');
        if (mapSection) {
            mapSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Highlight the marker
        highlightDestination(index);
    } catch (error) {
        console.error('Error viewing destination on map:', error);
    }
}

// Highlight destination marker
function highlightDestination(index) {
    if (!mainMap || !isMapInitialized) return;
    
    const destination = sikkimDestinations[index];
    if (!destination) return;
    
    try {
        // Create a temporary circle to highlight the destination
        const highlightCircle = L.circle([destination.latitude, destination.longitude], {
            color: '#1FB8CD',
            fillColor: '#1FB8CD',
            fillOpacity: 0.3,
            radius: 2000
        }).addTo(mainMap);
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            if (mainMap && highlightCircle) {
                mainMap.removeLayer(highlightCircle);
            }
        }, 3000);
    } catch (error) {
        console.error('Error highlighting destination:', error);
    }
}

// Open destination modal
function openDestinationModal(destinationName) {
    console.log('Opening modal for:', destinationName);
    
    const destination = sikkimDestinations.find(d => d.name === destinationName);
    if (!destination) {
        console.error('Destination not found:', destinationName);
        return;
    }
    
    const modal = document.getElementById('destination-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) {
        console.error('Modal elements not found');
        return;
    }
    
    modalBody.innerHTML = `
        <h2>${destination.name}</h2>
        <div class="destination-meta" style="margin-bottom: 20px;">
            <span class="meta-item">📍 ${destination.district}</span>
            <span class="meta-item">⛰️ ${destination.elevation}</span>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            ${destination.description}
        </p>
        
        <div class="highlights-section" style="margin-bottom: 24px;">
            <h3>Key Attractions</h3>
            <ul class="highlights-list">
                ${destination.highlights.map(highlight => 
                    `<li class="highlight-item">${highlight}</li>`
                ).join('')}
            </ul>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h3>Best Time to Visit</h3>
            <p style="color: var(--color-text-secondary);">${destination.best_time}</p>
        </div>
        
        <div id="modal-map-${destination.name.replace(/\s+/g, '')}" class="modal-map"></div>
        
        <div style="margin-top: 24px; text-align: center;">
            <button class="btn btn--primary view-main-map-btn" data-index="${sikkimDestinations.indexOf(destination)}">
                View on Main Map
            </button>
        </div>
    `;
    
    modal.classList.remove('hidden');
    
    // Initialize modal map after a short delay
    setTimeout(() => {
        initializeModalMap(destination);
    }, 200);
}

// Initialize modal map
function initializeModalMap(destination) {
    const mapId = `modal-map-${destination.name.replace(/\s+/g, '')}`;
    const mapElement = document.getElementById(mapId);
    
    if (!mapElement) {
        console.error('Modal map element not found:', mapId);
        return;
    }
    
    try {
        const modalMap = L.map(mapId).setView([destination.latitude, destination.longitude], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(modalMap);
        
        L.marker([destination.latitude, destination.longitude])
            .addTo(modalMap)
            .bindPopup(`<strong>${destination.name}</strong><br>${destination.district}`)
            .openPopup();
            
        console.log('Modal map initialized for', destination.name);
    } catch (error) {
        console.error('Error initializing modal map:', error);
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('destination-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // District filter
    const districtFilter = document.getElementById('district-filter');
    if (districtFilter) {
        districtFilter.addEventListener('change', handleFilter);
    }
    
    // Modal events
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Event delegation for dynamically created buttons
    document.addEventListener('click', function(event) {
        // View on map buttons
        if (event.target.classList.contains('view-on-map-btn')) {
            const index = parseInt(event.target.dataset.index);
            viewOnMap(index);
        }
        
        // Details buttons
        if (event.target.classList.contains('details-btn')) {
            const name = event.target.dataset.name;
            openDestinationModal(name);
        }
        
        // View main map from modal
        if (event.target.classList.contains('view-main-map-btn')) {
            const index = parseInt(event.target.dataset.index);
            closeModal();
            setTimeout(() => viewOnMap(index), 100);
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

// Handle search
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const district = document.getElementById('district-filter').value;
    filterDestinations(searchTerm, district);
}

// Handle filter
function handleFilter(event) {
    const district = event.target.value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filterDestinations(searchTerm, district);
}

// Filter destinations
function filterDestinations(searchTerm, district) {
    console.log('Filtering destinations:', { searchTerm, district });
    
    currentDestinations = sikkimDestinations.filter(destination => {
        const matchesSearch = !searchTerm || 
                            destination.name.toLowerCase().includes(searchTerm) ||
                            destination.description.toLowerCase().includes(searchTerm) ||
                            destination.highlights.some(h => h.toLowerCase().includes(searchTerm));
        
        const matchesDistrict = !district || destination.district === district;
        
        return matchesSearch && matchesDistrict;
    });
    
    renderDestinations();
    updateMapMarkers();
}

// Update map markers
function updateMapMarkers() {
    if (!mainMap || !isMapInitialized) return;
    
    try {
        // Clear existing markers
        destinationMarkers.forEach(marker => {
            mainMap.removeLayer(marker);
        });
        
        // Add markers for current destinations
        destinationMarkers = [];
        currentDestinations.forEach(destination => {
            const marker = L.marker([destination.latitude, destination.longitude])
                .addTo(mainMap)
                .bindPopup(createPopupContent(destination));
            
            const originalIndex = sikkimDestinations.findIndex(d => d.name === destination.name);
            marker.on('click', function() {
                highlightDestination(originalIndex);
            });
            
            destinationMarkers.push(marker);
        });
        
        // Fit map bounds if there are markers
        if (destinationMarkers.length > 0) {
            const group = new L.featureGroup(destinationMarkers);
            mainMap.fitBounds(group.getBounds().pad(0.1));
        }
    } catch (error) {
        console.error('Error updating map markers:', error);
    }
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.98)';
        navbar.style.backdropFilter = 'blur(12px)';
    } else {
        navbar.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Make functions globally available
window.viewOnMap = viewOnMap;
window.openDestinationModal = openDestinationModal;
window.closeModal = closeModal;