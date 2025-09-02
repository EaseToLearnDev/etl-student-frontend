export function tintHexColor(hexColor: string, amount = 0.4) {
    const hex = hexColor.replace('#', '');
    const fullHex = hex.length === 3 
      ? hex.split('').map(char => char + char).join('')
      : hex;
    
    let r = parseInt(fullHex.substring(0, 2), 16);
    let g = parseInt(fullHex.substring(2, 4), 16);
    let b = parseInt(fullHex.substring(4, 6), 16);
    
    // Mix with white (255, 255, 255)
    r = Math.round(r + (255 - r) * amount);
    g = Math.round(g + (255 - g) * amount);
    b = Math.round(b + (255 - b) * amount);
    
    const tintedHex = [r, g, b]
      .map(val => val.toString(16).padStart(2, '0'))
      .join('');
    
    return `#${tintedHex}`;
  }