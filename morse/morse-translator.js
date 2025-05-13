class MorseTranslator {
  constructor() {
    this.morseMap = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
      'Y': '-.--', 'Z': '--..', 
      '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
      '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', 
      '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', 
      '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', 
      ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', 
      '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
    };
    
    // Create reverse mapping (morse to text)
    this.textMap = {};
    for (const [key, value] of Object.entries(this.morseMap)) {
      this.textMap[value] = key;
    }
  }
  
  textToMorse(text) {
    return text.toUpperCase().split('').map(char => {
      return this.morseMap[char] || char;
    }).join(' ');
  }
  
  morseToText(morse) {
    return morse.split(' ').map(code => {
      return this.textMap[code] || code;
    }).join('');
  }
  
  playMorse(morse) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const dotDuration = 80; // milliseconds
    
    const playTone = (duration, pause) => {
      return new Promise(resolve => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 700;
        oscillator.type = 'sine';
        
        oscillator.start();
        
        setTimeout(() => {
          oscillator.stop();
          setTimeout(resolve, pause);
        }, duration);
      });
    };
    
    const playSequence = async (sequence) => {
      for (const char of sequence) {
        if (char === '.') {
          await playTone(dotDuration, dotDuration);
        } else if (char === '-') {
          await playTone(dotDuration * 3, dotDuration);
        } else if (char === ' ') {
          await new Promise(resolve => setTimeout(resolve, dotDuration * 3));
        } else if (char === '/') {
          await new Promise(resolve => setTimeout(resolve, dotDuration * 7));
        }
      }
    };
    
    playSequence(morse);
  }
}