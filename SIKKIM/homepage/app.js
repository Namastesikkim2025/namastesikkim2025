// Sikkim Travel Chatbot - Multilingual Assistant

// Language data and responses
const CHATBOT_DATA = {
  "languages": {
    "english": {
      "name": "English",
      "code": "en",
      "flag": "🇬🇧",
      "font_class": "",
      "greetings": {
        "hello": "Hello! Welcome to Sikkim!",
        "welcome": "Welcome to the beautiful state of Sikkim!",
        "goodbye": "Thank you for visiting! Have a great trip to Sikkim!"
      },
      "responses": {
        "default": "Hi there! I'm your Sikkim travel assistant. I can help you with information about destinations, weather, permits, and travel tips for Sikkim. How can I assist you today?",
        "destinations": "Sikkim has amazing destinations like Gangtok (capital), Pelling, Yuksom, Tsomgo Lake, Gurudongmar Lake, Yumthang Valley, Nathula Pass, and more. Which destination would you like to know about?",
        "weather": "Sikkim has pleasant weather year-round. Best time to visit: March to June and September to December. Summer is ideal for high altitude areas.",
        "permits": "Indian citizens need Inner Line Permit (ILP) for protected areas. Foreign nationals need Protected Area Permit (PAP) and Restricted Area Permit (RAP).",
        "hotels": "Sikkim offers various accommodations from luxury hotels in Gangtok to homestays in villages. Popular areas: MG Marg in Gangtok, Pelling, Ravangla.",
        "transport": "Nearest airport: Bagdogra (124 km from Gangtok). Nearest railway: New Jalpaiguri. Local transport includes taxis, shared jeeps, and buses.",
        "food": "Try local delicacies: Momos, Thukpa, Gundruk, Sel Roti, Chhurpi cheese, and traditional Sikkimese cuisine.",
        "culture": "Sikkim is multi-cultural with Lepcha, Bhutia, and Nepali communities. Visit monasteries, experience festivals like Losar and Pang Lhabsol."
      },
      "quickActions": ["Destinations", "Weather", "Permits", "Hotels", "Food", "Culture"],
      "ui": {
        "inputPlaceholder": "Type your message...",
        "sendButton": "Send",
        "selectLanguage": "Choose Your Language",
        "botName": "Sikkim Travel Assistant",
        "status": "Online"
      }
    },
    "hindi": {
      "name": "हिंदी",
      "code": "hi", 
      "flag": "🇮🇳",
      "font_class": "lang-hindi",
      "greetings": {
        "hello": "नमस्ते! सिक्किम में आपका स्वागत है!",
        "welcome": "सुंदर सिक्किम राज्य में आपका स्वागत है!",
        "goodbye": "धन्यवाद! सिक्किम की यात्रा का आनंद लें!"
      },
      "responses": {
        "default": "नमस्ते! मैं आपका सिक्किम यात्रा सहायक हूं। मैं आपको गंतव्य, मौसम, परमिट और सिक्किम की यात्रा के बारे में जानकारी दे सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
        "destinations": "सिक्किम में गंगटोक (राजधानी), पेलिंग, युक्सम, त्सोमगो झील, गुरुडोंगमार झील, युमथांग घाटी, नाथूला पास जैसे अद्भुत स्थान हैं। आप किस गंतव्य के बारे में जानना चाहते हैं?",
        "weather": "सिक्किम में साल भर सुहावना मौसम रहता है। घूमने का सबसे अच्छा समय: मार्च से जून और सितंबर से दिसंबर। ऊंचाई वाले क्षेत्रों के लिए गर्मी आदर्श है।",
        "permits": "भारतीय नागरिकों को संरक्षित क्षेत्रों के लिए इनर लाइन परमिट (ILP) चाहिए। विदेशी नागरिकों को प्रोटेक्टेड एरिया परमिट (PAP) और रिस्ट्रिक्टेड एरिया परमिट (RAP) चाहिए।",
        "hotels": "सिक्किम में गंगटोक के लक्जरी होटल से लेकर गांवों में होमस्टे तक विभिन्न आवास उपलब्ध हैं। लोकप्रिय क्षेत्र: गंगटोक में एमजी मार्ग, पेलिंग, रावंगला।",
        "transport": "निकटतम हवाई अड्डा: बागडोगरा (गंगटोक से 124 किमी)। निकटतम रेलवे: न्यू जलपाईगुड़ी। स्थानीय परिवहन में टैक्सी, साझा जीप और बसें शामिल हैं।",
        "food": "स्थानीय व्यंजन आज़माएं: मोमोज़, थुकपा, गुंद्रुक, सेल रोटी, छुर्पी चीज़, और पारंपरिक सिक्किमी व्यंजन।",
        "culture": "सिक्किम लेपचा, भूटिया और नेपाली समुदायों के साथ बहु-सांस्कृतिक है। मठों की यात्रा करें, लोसार और पांग ल्हाब्सोल जैसे त्योहारों का अनुभव करें।"
      },
      "quickActions": ["गंतव्य", "मौसम", "परमिट", "होटल", "खाना", "संस्कृति"],
      "ui": {
        "inputPlaceholder": "अपना संदेश लिखें...",
        "sendButton": "भेजें",
        "selectLanguage": "अपनी भाषा चुनें",
        "botName": "सिक्किम यात्रा सहायक",
        "status": "ऑनलाइन"
      }
    },
    "nepali": {
      "name": "नेपाली",
      "code": "ne",
      "flag": "🇳🇵", 
      "font_class": "lang-nepali",
      "greetings": {
        "hello": "नमस्ते! सिक्किममा स्वागत छ!",
        "welcome": "सुन्दर सिक्किम राज्यमा स्वागत छ!",
        "goodbye": "धन्यवाद! सिक्किमको यात्राको आनन्द लिनुहोस्!"
      },
      "responses": {
        "default": "नमस्ते! म तपाईंको सिक्किम यात्रा सहायक हुँ। म तपाईंलाई गन्तव्य, मौसम, अनुमति र सिक्किमको यात्राको बारेमा जानकारी दिन सक्छु। आज म तपाईंको कसरी सहायता गर्न सक्छु?",
        "destinations": "सिक्किममा गान्तोक (राजधानी), पेलिङ, युक्सम, त्सोमगो ताल, गुरुडोंगमार ताल, युम्थाङ उपत्यका, नाथुला पास जस्ता अद्भुत ठाउँहरू छन्। तपाईं कुन गन्तव्यको बारेमा जान्न चाहनुहुन्छ?",
        "weather": "सिक्किममा वर्षभरि रमणीय मौसम रहन्छ। घुम्नको लागि उत्तम समय: मार्चदेखि जुनसम्म र सेप्टेम्बरदेखि डिसेम्बरसम्म। उच्च उचाइका क्षेत्रहरूको लागि गर्मी आदर्श छ।",
        "permits": "भारतीय नागरिकहरूलाई सुरक्षित क्षेत्रहरूको लागि भित्री रेखा अनुमति (ILP) चाहिन्छ। विदेशी नागरिकहरूलाई सुरक्षित क्षेत्र अनुमति (PAP) र प्रतिबन्धित क्षेत्र अनुमति (RAP) चाहिन्छ।",
        "hotels": "सिक्किममा गान्तोकका लक्जरी होटेलदेखि गाउँका होमस्टेसम्म विभिन्न आवासहरू छन्। लोकप्रिय क्षेत्रहरू: गान्तोकको एमजी मार्ग, पेलिङ, रावाङला।",
        "transport": "निकटतम विमानस्थल: बागडोगरा (गान्तोकबाट १२४ किमी)। निकटतम रेलवे: नयाँ जलपाईगुडी। स्थानीय यातायातमा ट्याक्सी, साझा जीप र बसहरू छन्।",
        "food": "स्थानीय व्यञ्जनहरू चाख्नुहोस्: मोमो, थुक्पा, गुन्द्रुक, सेल रोटी, छुर्पी चिज, र परम्परागत सिक्किमी व्यञ्जनहरू।",
        "culture": "सिक्किम लेप्चा, भुटिया र नेपाली समुदायहरूसँग बहु-सांस्कृतिक छ। गुम्बाहरूको भ्रमण गर्नुहोस्, लोसार र पाङ ल्हाब्सोल जस्ता चाडपर्वहरूको अनुभव गर्नुहोस्।"
      },
      "quickActions": ["गन्तव्यहरू", "मौसम", "अनुमति", "होटलहरू", "खाना", "संस्कृति"],
      "ui": {
        "inputPlaceholder": "तपाईंको सन्देश टाइप गर्नुहोस्...",
        "sendButton": "पठाउनुहोस्",
        "selectLanguage": "तपाईंको भाषा छान्नुहोस्",
        "botName": "सिक्किम यात्रा सहायक",
        "status": "अनलाइन"
      }
    },
    "lepcha": {
      "name": "Lepcha",
      "code": "lep", 
      "flag": "🏔️",
      "font_class": "lang-lepcha",
      "greetings": {
        "hello": "Omāne! Mayel Lyang la kalek!",
        "welcome": "Mayel Lyang la changpen laksho!",
        "goodbye": "Thugje-che! Mayel Lyang la kalek lhen!"
      },
      "responses": {
        "default": "Omāne! Nga Sikkim yul-gyi lamyig rokpa yin. Nga khyed la sa-cha, nam-shi, lagpa dang Sikkim-gyi lam-yig skor la thenpa thub. De-ring nga khyed la ji-tar rogpa thub?",
        "destinations": "Mayel Lyang la Gangtok (rgyal-khab), Pelling, Yuksom, Tsomgo mtsho, Gurudongmar mtsho, Yumthang lung-pa, Nathu-la sogs yod. Khyed sa-cha gang-la shes-'dod?",
        "weather": "Mayel Lyang la lo-rgyus kun-tu skyid-po'i nam-mkha yod. 'gro-ba'i dus mchog: Zla-ba gsum-pa nas drug-pa bar dang dgu-pa nas bcu-gnyis-pa bar. Sa mtho-po'i sar dbyar-ga legs-pa yin.",
        "permits": "Rgya-gar-ba rang-rigs la srung-skyob sa-khongs-kyi nang-gi rgyud-lam lag-khyer dgos. Phyi-rgyal-pa la srung-skyob sa-khongs lag-khyer dang bcad-pa sa-khongs lag-khyer dgos.",
        "hotels": "Mayel Lyang la Gangtok-gi gra-pa'i khang-pa nas grong-pa'i khyim-gnas bar du 'khrugs-pa'i gnas yod. Grags-can sa-khongs: Gangtok-gi MG Marg, Pelling, Ravangla.",
        "transport": "Nye-shu gnam-thang: Bagdogra (Gangtok nas km 124). Nye-shu lcags-lam: New Jalpaiguri. Yul-phyogs 'phur-ba la mo-ta, mthun-po'i shing-rta dang gru-gzings yod.",
        "food": "Yul-phyogs zas-'thung myong-ba: Momos, Thukpa, Gundruk, Sel Roti, Chhurpi mar-ba, dang yul-phyogs Sikkim zas.",
        "culture": "Mayel Lyang Lepcha, Bhutia dang Nepali mi-rigs dang ldan-pa rig-gzhung mang-po yod. Dgon-pa la 'gro-ba, Losar dang Pang Lhabsol sogs dus-chen myong-ba."
      },
      "quickActions": ["Sa-cha", "Nam-shi", "Lag-pa", "Khang-pa", "Zas-'thung", "Rig-gzhung"],
      "ui": {
        "inputPlaceholder": "Khyed-kyi yi-ge bkod...",
        "sendButton": "Btang",
        "selectLanguage": "Khyed-kyi skad-yig dem-khye",
        "botName": "Mayel Lyang Lamyig Rokpa",
        "status": "Yod-pa"
      }
    },
    "bhutia": {
      "name": "Bhutia",
      "code": "sip",
      "flag": "🏔️", 
      "font_class": "lang-bhutia",
      "greetings": {
        "hello": "Kuzu-zangpo! Denjong la pheple!",
        "welcome": "Changpa-laksho! Denjong la kalek!",
        "goodbye": "Thugje-che! Denjong-la kalek nangten!"
      },
      "responses": {
        "default": "Kuzu-zangpo! Nga khyed-kyi Denjong lamyig rokpa yin. Nga khyed la yul-ljongs, dus-tshod, lagpa dang Denjong-gi lamyig skor thenpai thub. De-ring nga khyed la ji-tar rogpa thub?",
        "destinations": "Denjong la Gangtok (rgyal-sa), Pelling, Yuksom, Tsomgo-mtsho, Gurudongmar-mtsho, Yumthang lung-pa, Nathu-la sogs po-ta'i yul-ljongs yod. Khyed gang la shes-'dod?",
        "weather": "Denjong la lo-rgyus kun-tu skyid-po'i gnam-gshis yod. 'gro-thang mchog: zla-ba gsum-pa nas drug-pa bar dang zla-ba dgu-pa nas bcu-gnyis-pa bar. Ri mtho-po'i sar dbyar-ga legs-pa yin.",
        "permits": "Rgya-gar mi-ser la srung-skyob sa-khul-gyi nang-gi bar-lam lagpa dgos. Phyi-rgyal mi-ser la srung-skyob sa-khul lagpa dang bkag-pa sa-khul lagpa dgos.",
        "hotels": "Denjong la Gangtok-gi gra-pa'i gnas-khang nas grong-khyer gyi khyim-gnas bar-du'i gnas yod. Grags-can sa-khul: Gangtok MG Marg, Pelling, Ravangla.",
        "transport": "Nye-shu gnam-thang: Bagdogra (Gangtok nas km 124). Nye-shu lcags-lam: New Jalpaiguri. Sa-gnas 'khrul-'khor la mo-ta, mthun-po'i shing-rta dang 'khrul-'khor yod.",
        "food": "Sa-gnas kha-zas myong-ba: Momos, Thukpa, Gundruk, Sel Roti, Chhurpi mar-ba, dang sa-gnas Denjong-gi kha-lag.",
        "culture": "Denjong Lepcha, Bhutia dang Balti mi-rigs dang-bcas rig-gzhung mang-po yod. Dgon-pa la 'gro-ba, Losar dang Pang Lhabsol sogs dus-chen myong-ba."
      },
      "quickActions": ["Yul-ljongs", "Gnam-gshis", "Lagpa", "Gnas-khang", "Kha-zas", "Rig-gzhung"],
      "ui": {
        "inputPlaceholder": "Khyed-kyi gtam bkod...",
        "sendButton": "Gtong",
        "selectLanguage": "Khyed-kyi skad-yig khel",
        "botName": "Denjong Lamyig Rokpa",
        "status": "Yod-pa"
      }
    }
  },
  "intents": {
    "greetings": ["hello", "hi", "namaste", "good morning", "good evening", "kuzu zangpo", "omane", "नमस्ते", "हैलो", "हाय"],
    "destinations": ["places", "visit", "destinations", "gangtok", "pelling", "yuksom", "tsomgo", "gurudongmar", "yumthang", "nathu la", "where to go", "गंतव्य", "स्थान", "जगह"],
    "weather": ["weather", "climate", "temperature", "season", "rain", "snow", "cold", "hot", "मौसम", "जलवायु", "तापमान"],
    "permits": ["permit", "permission", "pass", "document", "foreigner", "tourist", "visa", "परमिट", "अनुमति", "दस्तावेज"],
    "hotels": ["hotel", "stay", "accommodation", "lodge", "guesthouse", "homestay", "where to stay", "होटल", "आवास", "ठहरना"],
    "transport": ["transport", "travel", "bus", "taxi", "flight", "train", "airport", "how to reach", "परिवहन", "यात्रा", "बस"],
    "food": ["food", "eat", "restaurant", "local food", "cuisine", "momo", "thukpa", "खाना", "भोजन", "व्यंजन"],
    "culture": ["culture", "festival", "monastery", "tradition", "people", "language", "religion", "संस्कृति", "त्योहार", "मठ"]
  }
};

// Global state
let currentLanguage = 'english';
let chatState = {
  isOpen: false,
  isLanguagePanelOpen: false,
  isMinimized: false,
  hasInteracted: false,
  messageCount: 0
};

// DOM elements
let elements = {};

// Initialize the chatbot when DOM is ready
function initializeChatbot() {
  console.log('Initializing Sikkim Travel Chatbot...');
  
  // Get DOM elements
  elements = {
    toggle: document.getElementById('chat-widget-toggle'),
    widget: document.getElementById('chat-widget'),
    languagePanel: document.getElementById('language-panel'),
    languageToggle: document.getElementById('language-toggle'),
    currentLanguageFlag: document.getElementById('current-language-flag'),
    chatMessages: document.getElementById('chat-messages'),
    chatInput: document.getElementById('chat-input'),
    chatSend: document.getElementById('chat-send'),
    quickActions: document.getElementById('quick-actions'),
    typingIndicator: document.getElementById('typing-indicator'),
    notificationBadge: document.getElementById('notification-badge'),
    chatBotName: document.getElementById('chat-bot-name'),
    chatStatus: document.getElementById('chat-status'),
    chatMinimize: document.getElementById('chat-minimize')
  };

  // Setup event listeners
  setupEventListeners();
  
  // Initialize language
  updateLanguage(currentLanguage);
  
  // Show welcome message after a short delay
  setTimeout(() => {
    if (!chatState.hasInteracted) {
      showWelcomeMessage();
    }
  }, 2000);

  console.log('Chatbot initialized successfully');
}

// Setup all event listeners
function setupEventListeners() {
  // Toggle chat widget
  elements.toggle.addEventListener('click', toggleChatWidget);
  
  // Language toggle
  elements.languageToggle.addEventListener('click', toggleLanguagePanel);
  
  // Minimize chat
  elements.chatMinimize.addEventListener('click', minimizeChat);
  
  // Send message
  elements.chatSend.addEventListener('click', handleSendMessage);
  elements.chatInput.addEventListener('keypress', handleInputKeyPress);
  elements.chatInput.addEventListener('input', handleInputChange);
  
  // Language selection
  setupLanguageOptions();
  
  // Quick actions will be setup when they're rendered
  
  // Click outside to close language panel
  document.addEventListener('click', handleOutsideClick);
  
  // Prevent chat widget clicks from bubbling
  elements.widget.addEventListener('click', (e) => e.stopPropagation());
}

// Setup language option buttons
function setupLanguageOptions() {
  const languageOptions = document.querySelectorAll('.language-option');
  languageOptions.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.dataset.lang;
      selectLanguage(lang);
    });
  });
}

// Toggle chat widget visibility
function toggleChatWidget() {
  console.log('Toggling chat widget');
  
  chatState.isOpen = !chatState.isOpen;
  chatState.hasInteracted = true;
  
  if (chatState.isOpen) {
    elements.widget.classList.remove('hidden');
    elements.toggle.classList.add('active');
    elements.toggle.querySelector('.chat-icon').classList.add('hidden');
    elements.toggle.querySelector('.close-icon').classList.remove('hidden');
    hideNotificationBadge();
    focusChatInput();
  } else {
    elements.widget.classList.add('hidden');
    elements.toggle.classList.remove('active');
    elements.toggle.querySelector('.chat-icon').classList.remove('hidden');
    elements.toggle.querySelector('.close-icon').classList.add('hidden');
    hideLanguagePanel();
  }
}

// Toggle language selection panel
function toggleLanguagePanel() {
  chatState.isLanguagePanelOpen = !chatState.isLanguagePanelOpen;
  
  if (chatState.isLanguagePanelOpen) {
    elements.languagePanel.classList.remove('hidden');
  } else {
    elements.languagePanel.classList.add('hidden');
  }
}

// Hide language panel
function hideLanguagePanel() {
  chatState.isLanguagePanelOpen = false;
  elements.languagePanel.classList.add('hidden');
}

// Minimize/expand chat
function minimizeChat() {
  chatState.isMinimized = !chatState.isMinimized;
  
  if (chatState.isMinimized) {
    elements.widget.classList.add('minimized');
  } else {
    elements.widget.classList.remove('minimized');
  }
}

// Handle outside clicks
function handleOutsideClick(e) {
  if (!elements.widget.contains(e.target) && !elements.toggle.contains(e.target)) {
    if (chatState.isLanguagePanelOpen) {
      hideLanguagePanel();
    }
  }
}

// Select a language
function selectLanguage(lang) {
  console.log('Selecting language:', lang);
  
  if (CHATBOT_DATA.languages[lang]) {
    const previousLanguage = currentLanguage;
    currentLanguage = lang;
    updateLanguage(lang);
    hideLanguagePanel();
    
    if (previousLanguage !== lang) {
      addBotMessage(CHATBOT_DATA.languages[lang].greetings.welcome);
      renderQuickActions();
    }
  }
}

// Update UI for selected language
function updateLanguage(lang) {
  const langData = CHATBOT_DATA.languages[lang];
  if (!langData) return;
  
  // Update flag
  elements.currentLanguageFlag.textContent = langData.flag;
  
  // Update UI text
  elements.chatBotName.textContent = langData.ui.botName;
  elements.chatStatus.textContent = langData.ui.status;
  elements.chatInput.placeholder = langData.ui.inputPlaceholder;
  
  // Update font class for messages
  updateMessageFonts(langData.font_class);
  
  console.log('Language updated to:', lang);
}

// Update font classes for existing messages
function updateMessageFonts(fontClass) {
  const messages = elements.chatMessages.querySelectorAll('.message-content');
  messages.forEach(message => {
    message.className = `message-content ${fontClass}`;
  });
  
  // Update input font
  elements.chatInput.className = `chat-input ${fontClass}`;
  
  // Update quick actions font
  const quickActionBtns = elements.quickActions.querySelectorAll('.quick-action');
  quickActionBtns.forEach(btn => {
    btn.className = `quick-action ${fontClass}`;
  });
}

// Handle input key press
function handleInputKeyPress(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
}

// Handle input changes
function handleInputChange() {
  const message = elements.chatInput.value.trim();
  elements.chatSend.disabled = message.length === 0;
}

// Handle send message
function handleSendMessage() {
  const message = elements.chatInput.value.trim();
  if (message.length === 0) return;
  
  // Add user message
  addUserMessage(message);
  
  // Clear input
  elements.chatInput.value = '';
  elements.chatSend.disabled = true;
  
  // Process message and respond
  setTimeout(() => {
    processUserMessage(message);
  }, 500);
}

// Add user message to chat
function addUserMessage(message) {
  const langData = CHATBOT_DATA.languages[currentLanguage];
  const messageEl = createMessageElement({
    content: message,
    isUser: true,
    fontClass: langData.font_class
  });
  
  elements.chatMessages.appendChild(messageEl);
  scrollToBottom();
  chatState.messageCount++;
}

// Add bot message to chat
function addBotMessage(message, showTyping = true) {
  if (showTyping) {
    showTypingIndicator();
    
    setTimeout(() => {
      hideTypingIndicator();
      addBotMessageImmediate(message);
    }, 1000 + Math.random() * 1000); // Random delay for realism
  } else {
    addBotMessageImmediate(message);
  }
}

// Add bot message immediately
function addBotMessageImmediate(message) {
  const langData = CHATBOT_DATA.languages[currentLanguage];
  const messageEl = createMessageElement({
    content: message,
    isUser: false,
    fontClass: langData.font_class
  });
  
  elements.chatMessages.appendChild(messageEl);
  scrollToBottom();
  chatState.messageCount++;
  
  if (!chatState.isOpen) {
    showNotificationBadge();
  }
}

// Create message element
function createMessageElement({ content, isUser, fontClass }) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
  
  const avatar = document.createElement('div');
  avatar.className = `message-avatar ${isUser ? 'user' : 'bot'}`;
  avatar.textContent = isUser ? '👤' : '🏔️';
  
  const messageContent = document.createElement('div');
  messageContent.className = `message-content ${fontClass}`;
  messageContent.textContent = content;
  
  const messageTime = document.createElement('div');
  messageTime.className = 'message-time';
  messageTime.textContent = getCurrentTime();
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(messageContent);
  messageContent.appendChild(messageTime);
  
  return messageDiv;
}

// Get current time formatted
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Process user message and generate response
function processUserMessage(message) {
  console.log('Processing message:', message);
  
  const intent = detectIntent(message.toLowerCase());
  const langData = CHATBOT_DATA.languages[currentLanguage];
  
  let response;
  
  if (intent) {
    response = langData.responses[intent] || langData.responses.default;
  } else {
    response = langData.responses.default;
  }
  
  addBotMessage(response);
  
  // Update quick actions based on intent
  if (intent && intent !== 'greetings') {
    renderQuickActions();
  }
}

// Detect intent from user message
function detectIntent(message) {
  for (const [intent, keywords] of Object.entries(CHATBOT_DATA.intents)) {
    for (const keyword of keywords) {
      if (message.includes(keyword.toLowerCase())) {
        return intent;
      }
    }
  }
  return null;
}

// Show typing indicator
function showTypingIndicator() {
  elements.typingIndicator.classList.remove('hidden');
  scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
  elements.typingIndicator.classList.add('hidden');
}

// Render quick action buttons
function renderQuickActions() {
  const langData = CHATBOT_DATA.languages[currentLanguage];
  elements.quickActions.innerHTML = '';
  
  langData.quickActions.forEach(action => {
    const button = document.createElement('button');
    button.className = `quick-action ${langData.font_class}`;
    button.textContent = action;
    button.addEventListener('click', () => handleQuickAction(action));
    elements.quickActions.appendChild(button);
  });
}

// Handle quick action click
function handleQuickAction(action) {
  // Map action to English for intent detection
  const actionMap = {
    'Destinations': 'destinations',
    'गंतव्य': 'destinations',
    'गन्तव्यहरू': 'destinations',
    'Sa-cha': 'destinations',
    'Yul-ljongs': 'destinations',
    
    'Weather': 'weather',
    'मौसम': 'weather',
    'Nam-shi': 'weather',
    'Gnam-gshis': 'weather',
    
    'Permits': 'permits',
    'परमिट': 'permits',
    'अनुमति': 'permits',
    'Lag-pa': 'permits',
    'Lagpa': 'permits',
    
    'Hotels': 'hotels',
    'होटल': 'hotels',
    'होटलहरू': 'hotels',
    'Khang-pa': 'hotels',
    'Gnas-khang': 'hotels',
    
    'Food': 'food',
    'खाना': 'food',
    "Zas-'thung": 'food',
    'Kha-zas': 'food',
    
    'Culture': 'culture',
    'संस्कृति': 'culture',
    'Rig-gzhung': 'culture'
  };
  
  const intent = actionMap[action] || 'destinations';
  const langData = CHATBOT_DATA.languages[currentLanguage];
  
  // Add user message
  addUserMessage(action);
  
  // Add bot response
  setTimeout(() => {
    const response = langData.responses[intent] || langData.responses.default;
    addBotMessage(response);
  }, 500);
}

// Show welcome message
function showWelcomeMessage() {
  const langData = CHATBOT_DATA.languages[currentLanguage];
  addBotMessage(langData.greetings.hello, false);
  
  setTimeout(() => {
    addBotMessage(langData.responses.default, false);
    renderQuickActions();
  }, 1000);
}

// Show notification badge
function showNotificationBadge() {
  elements.notificationBadge.classList.remove('hidden');
}

// Hide notification badge
function hideNotificationBadge() {
  elements.notificationBadge.classList.add('hidden');
}

// Focus chat input
function focusChatInput() {
  setTimeout(() => {
    elements.chatInput.focus();
  }, 100);
}

// Scroll chat to bottom
function scrollToBottom() {
  setTimeout(() => {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
  }, 50);
}

// Utility: Debounce function
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
  document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
  initializeChatbot();
}

// Make functions globally available for debugging
window.sikkimChatbot = {
  selectLanguage,
  addBotMessage,
  processUserMessage,
  chatState,
  currentLanguage,
  CHATBOT_DATA
};

console.log('Sikkim Travel Chatbot script loaded successfully');