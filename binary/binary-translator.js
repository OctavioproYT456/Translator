class BinaryTranslator {
  textToBinary(text) {
    return text.split('').map(char => {
      const binary = char.charCodeAt(0).toString(2);
      // Ensure each binary representation is 8 bits long
      return binary.padStart(8, '0');
    }).join(' ');
  }
  
  binaryToText(binary) {
    // Remove any extra spaces and split by space
    const cleanBinary = binary.trim().replace(/\s+/g, ' ');
    
    // Check if input is valid binary
    if (!/^[01\s]+$/.test(cleanBinary)) {
      throw new Error('El texto no es un código binario válido');
    }
    
    try {
      return cleanBinary.split(' ').map(bin => {
        if (bin.length === 0) return '';
        return String.fromCharCode(parseInt(bin, 2));
      }).join('');
    } catch (error) {
      throw new Error('Error al convertir binario a texto');
    }
  }
}