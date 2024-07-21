export function get_logo(text, fontSize=12, fontFamily = 'Arial') {
  let characterWidths = {};
  const averageCharacterWidth = characterWidths[fontFamily] || 0.55;
  // Calculer la largeur approximative du texte
  const textWidth = text.length * fontSize * averageCharacterWidth;
  return textWidth;
}