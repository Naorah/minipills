import { getTextWidth, adjustColor } from '$lib/ColorUtil.js'

function getFirstPillData(width, height, radius) {
  //
  // Creation de la première pill
  //
  radius = Math.min(radius, height / 2, width / 2);

  return `M${radius},0
          H${width}
          V${height}
          H${radius}
          A${radius},${radius} 0 0 1 0,${height - radius}
          V${radius-1}
          A${radius},${radius} 0 0 1 ${radius},0
          Z`;
}

function getSecondPillData(width, height, radius) {
  //
  // Creation de la deuxième pill
  //
  radius = Math.min(radius, height / 2, width / 2);

  return `M0,0
          H${width - radius}
          A${radius},${radius} 0 0 1 ${width},${radius}
          V${height - radius}
          A${radius},${radius} 0 0 1 ${width - radius},${height}
          H0
          V0
          Z`;
}

export function two_pills(first_text, first_color, first_background_color, second_text, second_color, second_background_color) {
  let stroke = 0;
  let strokeWidth = 0;
  //
  // ############# TEXT COLOR BUILDING #############
  //
  first_color = "#"+first_color;
  second_color = "#"+second_color;
  
  //
  // ############# GRADIENT BUILDING #############
  //
  let first_gradientStart;
  let first_gradientEnd;
  first_gradientStart = adjustColor("#"+first_background_color, 8);
  first_gradientEnd = adjustColor("#"+first_background_color, -8);

  let second_gradientStart;
  let second_gradientEnd;
  second_gradientStart = adjustColor("#"+second_background_color, 20);
  second_gradientEnd = adjustColor("#"+second_background_color, -20);
  
  //
  // ############# RECTANGLE BUILDING #############
  //
  let width;
  let height = 22;

  const radius = 5;
  width = getTextWidth(first_text) + 10;
  
  let width2;
  width2 = getTextWidth(second_text) + 10;
  
  return `
    <svg width="${width+width2}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="first_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${first_gradientStart};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${first_gradientEnd};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="second_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${second_gradientStart};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${second_gradientEnd};stop-opacity:1" />
        </linearGradient>
      </defs>
      <path
        d="${getFirstPillData(width, height, radius)}" 
        fill="${`url(#first_gradient)`}"
        stroke="${stroke}" 
        stroke-width="${strokeWidth}" 
      />
      <text 
        x="${width / 2}"
        y="55%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="${first_color}"
        font-size="12"
        font-family="Arial"
      >
        ${first_text}
      </text>

      <path
        d="${getSecondPillData(width2, height, radius)}" 
        fill="${`url(#second_gradient)`}"
        stroke="${stroke}" 
        stroke-width="${strokeWidth}"
        transform="${`translate(${width}, 0)`}"
      />
      <text 
        x="${width + (width2 / 2)}"
        y="55%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="${second_color}"
        font-size="12"
        font-family="Arial"
      >
        ${second_text}
      </text>
    </svg>
  `
}

