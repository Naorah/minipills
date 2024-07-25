import { createCanvas } from 'canvas';

export function getTextWidth(text, fontSize=12, fontFamily = 'Arial') {
  // Charger la police
  try {
    // Create a canvas element
    const canvas = createCanvas(20000, 200); // width and height can be arbitrary
    const context = canvas.getContext('2d');

    // Set the font properties
    context.font = `${fontSize}px ${fontFamily}`;

    // Measure the text width
    const metrics = context.measureText(text);
    return metrics.width;
  } catch (error) {
    console.log(error);
    return 0.55 * fontSize * text.length;
  }
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

//
// isHexColor : function : tell if the given color is hexadecimal
//
export function isHexColor(str) {
  const hexColorPattern = /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  return hexColorPattern.test(str);
}