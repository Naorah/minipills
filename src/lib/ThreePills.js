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
  return `M0,0
          H${width}
          V${height}
          H0
          V0
          Z`;
}

function getThirdPillData(width, height, radius) {
  //
  // Creation de la dernière pill
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

/**
 * TWO PILLS GENERATOR
 */
export function three_pills(
                            first_text, 
                            first_color, 
                            first_background_color, 
                            second_text, 
                            second_color, 
                            second_background_color, 
                            third_text, 
                            third_color, 
                            third_background_color, 
                            logo, 
                            logo_color, 
                            shadow, 
                            pillng
                          ) {
  let stroke = 0;
  let strokeWidth = 0;
  let pillng_bonus_height = pillng ? 2 : 0

  //
  // ############# TEXT COLOR BUILDING #############
  //
  first_color = "#"+first_color;
  second_color = "#"+second_color;
  third_color = "#"+third_color;
  
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

  let third_gradientStart;
  let third_gradientEnd;
  third_gradientStart = adjustColor("#"+third_background_color, 20);
  third_gradientEnd = adjustColor("#"+third_background_color, -20);
  
  //
  // ############# RECTANGLE BUILDING #############
  //
  let width;
  let height = 22;

  const radius = 5;
  width = getTextWidth(first_text) + 10;
  
  let width2;
  width2 = getTextWidth(second_text) + 10;

  let width3;
  width3 = getTextWidth(third_text) + 10;

  //
  // ############# LOGO HANDLER #############
  //
  let logo_width = 24; // 24 is basic logo size
  let logo_aimed_size = 0; // 18 is fit logo size
  let logo_final;
  let scaleFactor;
  if (logo) {
    logo_aimed_size = 18;
    scaleFactor = logo_aimed_size/logo_width; 
    width += logo_aimed_size + 5 // logo space + margin right
    logo_final = `
      <g transform="scale(${scaleFactor}) translate(${(((-width-width2-width3)/2) + logo_aimed_size)}, 3)">
        ${logo.replace('<svg', `<svg fill="${logo_color}"`)}
      </g>
    `
  }

  //
  // ############# SHADOW HANDLER #############
  //
  let logo_shadow_final;
  let text_shadow1;
  let text_shadow2;
  let text_shadow3;
  if(shadow) {
    let shadow_color1 = adjustColor(first_color, -100);
    let shadow_color2 = adjustColor(second_color, -100);
    let shadow_color3 = adjustColor(third_color, -100);
    text_shadow1 = `
    <text
    x="${(width/2) + logo_aimed_size/2}"
    y="57%"
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="${shadow_color1}"
    font-size="12"
    font-family="Arial"
    >
    ${first_text}
    </text>
    `
    text_shadow2 = `
    <text
    x="${width + (width2 / 2)}"
    y="57%"
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="${shadow_color2}"
    font-size="12"
    font-family="Arial"
    >
    ${second_text}
    </text>
    `
    text_shadow3 = `
    <text
    x="${width + width2 + (width3 / 2)}"
    y="57%"
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="${shadow_color3}"
    font-size="12"
    font-family="Arial"
    >
    ${third_text}
    </text>
    `
    if (logo) {
      let logo_shadow_color = adjustColor(logo_color, -100);
      logo_shadow_final = `
      <g transform="scale(${scaleFactor}) translate(${(((-width-width2-width3)/2) + logo_aimed_size)}, 3.8)">
        ${logo.replace('<svg', `<svg fill="${logo_shadow_color}"`)}
      </g>`
    }
  }
  
  return `
    <svg width="${width+width2+width3}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="first_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${first_gradientStart};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${first_gradientEnd};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="second_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${second_gradientStart};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${second_gradientEnd};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="third_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${third_gradientStart};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${third_gradientEnd};stop-opacity:1" />
        </linearGradient>
      </defs>
      <path
        d="${getFirstPillData(width, height, radius)}" 
        fill="${`url(#first_gradient)`}"
        stroke="${stroke}" 
        stroke-width="${strokeWidth}" 
      />
      
      ${logo_shadow_final}
      ${logo_final}

      ${text_shadow1}
      <text 
        x="${(width/2) + logo_aimed_size/2}"
        y="${height/2+1+pillng_bonus_height}" 
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
      ${text_shadow2}
      <text 
        x="${width + (width2 / 2)}"
        y="${height/2+1+pillng_bonus_height}" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="${second_color}"
        font-size="12"
        font-family="Arial"
      >
        ${second_text}
      </text>

      <path
        d="${getThirdPillData(width3, height, radius)}" 
        fill="${`url(#third_gradient)`}"
        stroke="${stroke}" 
        stroke-width="${strokeWidth}"
        transform="${`translate(${width+width2}, 0)`}"
      />
      ${text_shadow3}
      <text
        x="${width + width2 + (width3 / 2)}"
        y="${height/2+1+pillng_bonus_height}" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="${third_color}"
        font-size="12"
        font-family="Arial"
      >
        ${third_text}
      </text>

    </svg>
  `
}

