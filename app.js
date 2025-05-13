document.addEventListener('DOMContentLoaded', () => {
  // Initialize the translator
  const translator = new Translator();
  
  // DOM elements
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const sourceLanguageSelect = document.getElementById('source-language');
  const targetLanguageSelect = document.getElementById('target-language');
  const sourceText = document.getElementById('source-text');
  const targetText = document.getElementById('target-text');
  const translateBtn = document.getElementById('translate-btn');
  const swapLanguagesBtn = document.getElementById('swap-languages');
  const clearSourceBtn = document.getElementById('clear-source');
  const copySourceBtn = document.getElementById('copy-source');
  const copyTargetBtn = document.getElementById('copy-target');
  const speakSourceBtn = document.getElementById('speak-source');
  const speakTargetBtn = document.getElementById('speak-target');
  
  // Theme management
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  // Initialize theme
  initTheme();
  
  // Menu functionality
  function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }
  
  function closeMenuHandler() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Populate language dropdowns
  window.populateLanguageDropdowns();
  
  // Translation functionality
  async function translateText() {
    try {
      const source = sourceLanguageSelect.value;
      const target = targetLanguageSelect.value;
      const text = sourceText.value;
      
      if (!text.trim()) {
        targetText.value = '';
        return;
      }
      
      // Show loading state
      targetText.value = 'Traduciendo...';
      translateBtn.disabled = true;
      
      const translatedText = await translator.translate(text, source, target);
      targetText.value = translatedText;
    } catch (error) {
      targetText.value = `Error: ${error.message}`;
    } finally {
      translateBtn.disabled = false;
    }
  }
  
  // Utility functions
  function swapLanguages() {
    // Only swap if source is not "auto"
    if (sourceLanguageSelect.value !== 'auto') {
      const sourceValue = sourceLanguageSelect.value;
      const targetValue = targetLanguageSelect.value;
      
      sourceLanguageSelect.value = targetValue;
      targetLanguageSelect.value = sourceValue;
      
      // Also swap the text content
      const sourceContent = sourceText.value;
      sourceText.value = targetText.value;
      targetText.value = sourceContent;
    }
  }
  
  function clearSource() {
    sourceText.value = '';
    targetText.value = '';
    sourceText.focus();
  }
  
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a visual feedback here
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }
  
  function speakText(text, language) {
    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language for speech if it's not "auto"
    if (language !== 'auto') {
      utterance.lang = language;
    }
    
    window.speechSynthesis.speak(utterance);
  }
  
  // Event listeners
  menuToggle.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', closeMenuHandler);
  overlay.addEventListener('click', closeMenuHandler);
  themeToggle.addEventListener('click', toggleTheme);
  
  translateBtn.addEventListener('click', translateText);
  
  // Auto-translate after a shorter delay when typing (300ms instead of 1000ms)
  let typingTimer;
  sourceText.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(translateText, 300);
  });
  
  swapLanguagesBtn.addEventListener('click', swapLanguages);
  
  clearSourceBtn.addEventListener('click', clearSource);
  
  copySourceBtn.addEventListener('click', () => {
    copyToClipboard(sourceText.value);
  });
  
  copyTargetBtn.addEventListener('click', () => {
    copyToClipboard(targetText.value);
  });
  
  speakSourceBtn.addEventListener('click', () => {
    speakText(sourceText.value, sourceLanguageSelect.value);
  });
  
  speakTargetBtn.addEventListener('click', () => {
    speakText(targetText.value, targetLanguageSelect.value);
  });
  
  // Also translate when languages change
  sourceLanguageSelect.addEventListener('change', translateText);
  targetLanguageSelect.addEventListener('change', translateText);
});