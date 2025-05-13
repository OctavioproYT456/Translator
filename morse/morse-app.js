document.addEventListener('DOMContentLoaded', () => {
  // Initialize the translator
  const morseTranslator = new MorseTranslator();
  
  // DOM elements
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const sourceText = document.getElementById('source-text');
  const targetText = document.getElementById('target-text');
  const translateBtn = document.getElementById('translate-btn');
  const swapLanguagesBtn = document.getElementById('swap-languages');
  const clearSourceBtn = document.getElementById('clear-source');
  const copySourceBtn = document.getElementById('copy-source');
  const copyTargetBtn = document.getElementById('copy-target');
  const playMorseBtn = document.getElementById('play-morse');
  
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
  
  // Initialize theme
  initTheme();
  
  // Translation functionality
  function translate() {
    try {
      const text = sourceText.value;
      
      if (!text.trim()) {
        targetText.value = '';
        return;
      }
      
      // Check if source is morse or text
      const isMorse = /^[.\-/ ]+$/.test(text.trim());
      
      if (isMorse) {
        targetText.value = morseTranslator.morseToText(text);
      } else {
        targetText.value = morseTranslator.textToMorse(text);
      }
    } catch (error) {
      targetText.value = `Error: ${error.message}`;
    }
  }
  
  // Utility functions
  function swapLanguages() {
    const sourceContent = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = sourceContent;
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
  
  function playMorse() {
    const morse = targetText.value;
    if (morse && /^[.\-/ ]+$/.test(morse)) {
      morseTranslator.playMorse(morse);
    }
  }
  
  // Event listeners
  menuToggle.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', closeMenuHandler);
  overlay.addEventListener('click', closeMenuHandler);
  
  themeToggle.addEventListener('click', toggleTheme);
  
  translateBtn.addEventListener('click', translate);
  
  // Auto-translate after a shorter delay when typing
  let typingTimer;
  sourceText.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(translate, 300);
  });
  
  swapLanguagesBtn.addEventListener('click', swapLanguages);
  
  clearSourceBtn.addEventListener('click', clearSource);
  
  copySourceBtn.addEventListener('click', () => {
    copyToClipboard(sourceText.value);
  });
  
  copyTargetBtn.addEventListener('click', () => {
    copyToClipboard(targetText.value);
  });
  
  playMorseBtn.addEventListener('click', playMorse);
});