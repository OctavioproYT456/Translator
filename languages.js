const LANGUAGES = {
  "auto": "Detectar idioma",
  "af": "Afrikáans",
  "sq": "Albanés",
  "am": "Amárico",
  "ar": "Árabe",
  "hy": "Armenio",
  "az": "Azerí",
  "eu": "Vasco",
  "be": "Bielorruso",
  "bn": "Bengalí",
  "bs": "Bosnio",
  "bg": "Búlgaro",
  "ca": "Catalán",
  "ceb": "Cebuano",
  "zh-CN": "Chino (Simplificado)",
  "zh-TW": "Chino (Tradicional)",
  "co": "Corso",
  "hr": "Croata",
  "cs": "Checo",
  "da": "Danés",
  "nl": "Neerlandés",
  "en": "Inglés",
  "eo": "Esperanto",
  "et": "Estonio",
  "fi": "Finés",
  "fr": "Francés",
  "fy": "Frisón",
  "gl": "Gallego",
  "ka": "Georgiano",
  "de": "Alemán",
  "el": "Griego",
  "gu": "Gujarati",
  "ht": "Criollo haitiano",
  "ha": "Hausa",
  "haw": "Hawaiano",
  "he": "Hebreo",
  "hi": "Hindi",
  "hmn": "Hmong",
  "hu": "Húngaro",
  "is": "Islandés",
  "ig": "Igbo",
  "id": "Indonesio",
  "ga": "Irlandés",
  "it": "Italiano",
  "ja": "Japonés",
  "jv": "Javanés",
  "kn": "Canarés",
  "kk": "Kazajo",
  "km": "Jemer",
  "rw": "Kinyarwanda",
  "ko": "Coreano",
  "ku": "Kurdo",
  "ky": "Kirguís",
  "lo": "Lao",
  "la": "Latín",
  "lv": "Letón",
  "lt": "Lituano",
  "lb": "Luxemburgués",
  "mk": "Macedonio",
  "mg": "Malgache",
  "ms": "Malayo",
  "ml": "Malayalam",
  "mt": "Maltés",
  "mi": "Maorí",
  "mr": "Marathi",
  "mn": "Mongol",
  "my": "Myanmar (Birmano)",
  "ne": "Nepalí",
  "no": "Noruego",
  "ny": "Nyanja (Chichewa)",
  "or": "Odia (Oriya)",
  "ps": "Pastún",
  "fa": "Persa",
  "pl": "Polaco",
  "pt": "Portugués",
  "pa": "Punjabi",
  "ro": "Rumano",
  "ru": "Ruso",
  "sm": "Samoano",
  "gd": "Gaélico escocés",
  "sr": "Serbio",
  "st": "Sesotho",
  "sn": "Shona",
  "sd": "Sindhi",
  "si": "Cingalés",
  "sk": "Eslovaco",
  "sl": "Esloveno",
  "so": "Somalí",
  "es": "Español",
  "su": "Sundanés",
  "sw": "Suajili",
  "sv": "Sueco",
  "tl": "Tagalo (Filipino)",
  "tg": "Tayiko",
  "ta": "Tamil",
  "tt": "Tártaro",
  "te": "Telugu",
  "th": "Tailandés",
  "tr": "Turco",
  "tk": "Turcomano",
  "uk": "Ucraniano",
  "ur": "Urdu",
  "ug": "Uigur",
  "uz": "Uzbeko",
  "vi": "Vietnamita",
  "cy": "Galés",
  "xh": "Xhosa",
  "yi": "Yiddish",
  "yo": "Yoruba",
  "zu": "Zulú"
};

// Make the function available globally
window.populateLanguageDropdowns = function() {
  const sourceLanguageSelect = document.getElementById('source-language');
  const targetLanguageSelect = document.getElementById('target-language');
  
  // Clear existing options
  sourceLanguageSelect.innerHTML = '';
  targetLanguageSelect.innerHTML = '';
  
  // Add options for source language (including auto-detect)
  for (const [code, name] of Object.entries(LANGUAGES)) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    sourceLanguageSelect.appendChild(option);
    
    // Don't add 'auto' to target language dropdown
    if (code !== 'auto') {
      const targetOption = document.createElement('option');
      targetOption.value = code;
      targetOption.textContent = name;
      targetLanguageSelect.appendChild(targetOption);
    }
  }
  
  // Set defaults
  sourceLanguageSelect.value = 'auto';
  targetLanguageSelect.value = 'es';
}