class Translator {
  constructor() {
    this.baseUrl = 'https://translate.googleapis.com/translate_a/single';
  }
  
  async translate(text, sourceLanguage, targetLanguage) {
    if (!text.trim()) {
      return '';
    }
    
    try {
      const params = new URLSearchParams({
        client: 'gtx', // unofficial API
        sl: sourceLanguage,
        tl: targetLanguage,
        dt: 't', // return translated text
        q: text
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Translation request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract translated text from the response
      // The response structure is complex nested arrays
      let translatedText = '';
      if (data && data[0]) {
        for (const segment of data[0]) {
          if (segment[0]) {
            translatedText += segment[0];
          }
        }
      }
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text. Please try again later.');
    }
  }
}