import { getTextWidth, adjustColor } from '$lib/ColorUtil.js'
import { createGradient, pill_padding } from '$lib/PillBuilder.js'

//
// getPillData : function : pill creation
// @param : width  : width of the pill
// @param : height : height of the pill
// @param : radius : basic radius
// @param : type   : type ( first or second part of the pill )
//
function getPillData(width, height, radius, type) {
  // radius
  radius = Math.min(radius, height / 2, width / 2);

  if (type === "first") {
    return `M${radius},0
            H${width}
            V${height}
            H${radius}
            A${radius},${radius} 0 0 1 0,${height - radius}
            V${radius-1}
            A${radius},${radius} 0 0 1 ${radius},0
            Z`;
  }

  if (type === "second") {
    return `M0,0
           H${width}
           V${height}
           H0
           V0
           Z`;
  }

  if (type === "third") {
    return `M0,0
            H${width - radius}
            A${radius},${radius} 0 0 1 ${width},${radius}
            V${height - radius}
            A${radius},${radius} 0 0 1 ${width - radius},${height}
            H0
            V0
            Z`;
  }
}

//
// three_pills : function : generate a triple pill
//
// @param : first_text              : str  : first text
// @param : first_color             : str  : first text color without the #
// @param : first_background_color  : str  : first background color without the #
// @param : second_text             : str  : second text
// @param : second_color            : str  : second text color without the #
// @param : second_background_color : str  : second background color without the #
// @param : third_text              : str  : third text
// @param : third_color             : str  : third text color without the #
// @param : third_background_color  : str  : third background color without the #
// @param : logo                    : str  : logo svg content
// @param : logo_color              : str  : logo color without the #
// @param : shadow                  : bool : if the pill has shadows on text & logo
// @param : pillng                  : str  : if the pill will be a png ( text must be lower )
// @param : scale                   : int  : scale for the image size
//
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
                            pillng,
                            scale
                          ) {
  
  // Color & Gradient setup
  first_color = `#${first_color}`;
  second_color = `#${second_color}`;
  third_color = `#${third_color}`;
  const first_gradient_start = adjustColor(`#${first_background_color}`, 20);
  const first_gradient_end = adjustColor(`#${first_background_color}`, -20);
  const second_gradient_start = adjustColor(`#${second_background_color}`, 20);
  const second_gradient_end = adjustColor(`#${second_background_color}`, -20);
  const third_gradient_start = adjustColor(`#${third_background_color}`, 20);
  const third_gradient_end = adjustColor(`#${third_background_color}`, -20);

  // Dimension & styling
  const height = 22;
  const logo_width = 24;
  const radius = 5;
  const text_width_1 = getTextWidth(first_text);
  const text_width_2 = getTextWidth(second_text);
  const text_width_3 = getTextWidth(third_text);
  // aimed size
  const logo_aimed_size = logo ? 18 : 0;
  const pillng_bonus_height = pillng ? 3 : 0;
  // final width of each part of the pill
  const width_1 = text_width_1 + pill_padding + (logo ? (logo_aimed_size + 5) : 0);
  const width_2 = text_width_2 + pill_padding;
  const width_3 = text_width_3 + pill_padding;

  // Logo creation
  let logo_final = '';
  let logo_shadow_final = '';
  if (logo) {
    const scaleFactor = logo_aimed_size / logo_width; 
    logo_final = `
      <g transform="scale(${scaleFactor}) translate(${(((-width_1-width_2-width_3)/2) + logo_aimed_size)}, 3)">
        ${logo.replace('<svg', `<svg fill="${logo_color}"`)}
      </g>
    `
    // if shadow then build else empty
    logo_shadow_final = shadow ? `
      <g transform="scale(${scaleFactor}) translate(${(((-width_1-width_2-width_3)/2) + logo_aimed_size)}, 3.8)">
        ${logo.replace('<svg', `<svg fill="${adjustColor(logo_color, -100)}"`)}
      </g>` : ''
  }

  // text shadow
  const text_shadow_1 = shadow ? `
    <text
    x="${(width_1 / 2) + logo_aimed_size/2}"
    y="57%"
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="${adjustColor(first_color, -100)}"
    font-size="12"
    font-family="Arial"
    >
    ${first_text}
    </text>
  ` : ''
  const text_shadow_2 = shadow ? `
    <text
    x="${width_1 + (width_2 / 2)}"
    y="57%"
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="${adjustColor(second_color, -100)}"
    font-size="12"
    font-family="Arial"
    >
    ${second_text}
    </text>
  ` : ''
  const text_shadow_3 = shadow ? `
    <text
    x="${width_1 + width_2 + (width_3 / 2)}"
    y="57%"
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="${adjustColor(third_color, -100)}"
    font-size="12"
    font-family="Arial"
    >
    ${second_text}
    </text>
  ` : ''
  
  return `
    <svg viewBox="0 0 ${width_1 + width_2 + width_3} ${height}" width="${(width_1 + width_2 + width_3)*scale}" height="${height*scale}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${createGradient('first_gradient', first_gradient_start, first_gradient_end)}
        ${createGradient('second_gradient', second_gradient_start, second_gradient_end)}
        ${createGradient('third_gradient', third_gradient_start, third_gradient_end)}
      </defs>
      <path
        d="${getPillData(width_1, height, radius, 'first')}" 
        fill="${`url(#first_gradient)`}"
        stroke="0" 
        stroke-width="0"
      />
      ${logo_shadow_final}
      ${logo_final}
      ${text_shadow_1}
      <text 
        x="${(width_1 / 2) + logo_aimed_size / 2}"
        y="${height / 2 + 1 + pillng_bonus_height}" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="${first_color}"
        font-size="12"
        font-family="Arial"
      >
        ${first_text}
      </text>

      <path
        d="${getPillData(width_2, height, radius, 'second')}" 
        fill="${`url(#second_gradient)`}"
        stroke="0" 
        stroke-width="0"
        transform="${`translate(${width_1}, 0)`}"
      />
      ${text_shadow_2}
      <text 
        x="${width_1 + (width_2 / 2)}"
        y="${height / 2 + 1 + pillng_bonus_height}" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="${second_color}"
        font-size="12"
        font-family="Arial"
      >
        ${second_text}
      </text>

      <path
        d="${getPillData(width_3, height, radius, 'third')}" 
        fill="${`url(#third_gradient)`}"
        stroke="0" 
        stroke-width="0"
        transform="${`translate(${width_1 + width_2}, 0)`}"
      />
      ${text_shadow_3}
      <text
        x="${width_1 + width_2 + (width_3 / 2)}"
        y="${height / 2 + 1 + pillng_bonus_height}" 
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

