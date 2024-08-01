
//
// pill padding : int : padding right & left for each pill text
//
const pill_padding = 10
//
// createGradient : function : create a gradient from params
// @param : id          : id for the gradient
// @param : startColor  : color at the top
// @param : endColor    : color at the bottom
// @param : offsetStart : gradient start position
// @param : offsetEnd   : gradient end position
//
function createGradient(id, startColor, endColor, offsetStart = 0, offsetEnd = 100) {
  return `
    <linearGradient id="${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="${offsetStart}%" style="stop-color:${startColor};stop-opacity:1" />
      <stop offset="${offsetEnd}%" style="stop-color:${endColor};stop-opacity:1" />
    </linearGradient>
  `;
}

// export values
export { createGradient, pill_padding }