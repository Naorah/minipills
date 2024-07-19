export function getTextWidth(text, fontSize=12, fontFamily = 'Arial') {
  let characterWidths = {};
  const averageCharacterWidth = characterWidths[fontFamily] || 0.55;
  // Calculer la largeur approximative du texte
  const textWidth = text.length * fontSize * averageCharacterWidth;
  return textWidth;
}

export function adjustColor(color, adjustment) {
  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  };

  // Convert RGB color to hex
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  // Adjust the color
  const [r, g, b] = hexToRgb(color);
  const rAdjusted = Math.min(255, Math.max(0, r + adjustment));
  const gAdjusted = Math.min(255, Math.max(0, g + adjustment));
  const bAdjusted = Math.min(255, Math.max(0, b + adjustment));

  return rgbToHex(rAdjusted, gAdjusted, bAdjusted);
}