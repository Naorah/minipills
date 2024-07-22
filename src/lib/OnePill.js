import { getTextWidth, adjustColor } from '$lib/ColorUtil.js'

/**
 * ONE PILL GENERATOR
 */
export function one_pill(first_text, first_color, first_background_color, logo, logo_color, shadow) {
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

  //
  // ############# LOGO HANDLER #############
  //
  let logo_width = 24; // 24 is basic logo size
  let logo_aimed_size = 0;
  let logo_final;
  let scaleFactor;
  if (logo) {
    logo_aimed_size = 18;
    scaleFactor = logo_aimed_size/logo_width; 
    width += logo_aimed_size + 5 // logo space + margin right
    logo_final = `
      <g transform="scale(${scaleFactor}) translate(${((-width/2) + logo_aimed_size)}, 3)">
        ${logo.replace('<svg', `<svg fill="${logo_color}"`)}
      </g>
    `
  }

  //
  // ############# SHADOW HANDLER #############
  //
  let logo_shadow_final;
  let text_shadow;
  if(shadow) {
    let text_shadow_color = adjustColor(first_color, -100);
    text_shadow = `
    <text
    x="${(width/2) + logo_aimed_size/2}"
    y="57%"
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="${text_shadow_color}"
    font-size="12"
    font-family="Arial"
    >
    ${first_text}
    </text>
    `
    if (logo) {
      let logo_shadow_color = adjustColor(logo_color, -100);
      logo_shadow_final = `
        <g transform="scale(${scaleFactor}) translate(${((-width/2) + logo_aimed_size)}, 3.8)">
          ${logo.replace('<svg', `<svg fill="${logo_shadow_color}"`)}
        </g>
      `
    }
  }

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
      ${logo_shadow_final}
      ${logo_final}
      ${text_shadow}
      <text
        x="${(width/2) + logo_aimed_size/2}"
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

