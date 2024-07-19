import { getTextWidth, adjustColor } from '$lib/ColorUtil.js'

export function one_pill(first_text, first_color, first_background_color) {
  let stroke = 0;
  let strokeWidth = 0;
  //
  // ############# TEXT COLOR BUILDING #############
  //
  first_color = "#"+first_color;
  
  //
  // ############# GRADIENT BUILDING #############
  //
  let gradientStart;
  let gradientEnd;
  gradientStart = adjustColor("#"+first_background_color, 8);
  gradientEnd = adjustColor("#"+first_background_color, -8);
  
  //
  // ############# RECTANGLE BUILDING #############
  //
  let width;
  let height = 22;
  const radius = 5

  width = getTextWidth(first_text) + 10;

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="first_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${gradientStart};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${gradientEnd};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect 
        width="${width}"
        height="${height}"
        rx="${radius}"
        ry="${radius}"
        fill="${`url(#first_gradient)`}"
        stroke="${stroke}"
        stroke-width="${strokeWidth}"
      />
      <text 
        x="50%" 
        y="55%"
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="${first_color}"
        font-size="12"
        font-family="Arial"
      >
        ${first_text}
      </text>
    </svg>
  `
}

