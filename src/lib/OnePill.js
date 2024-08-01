import { getTextWidth, adjustColor } from '$lib/ColorUtil.js'
import { createGradient, pill_padding } from '$lib/PillBuilder.js'

//
// one_pill : function : generate a simple pill
//
// @param : first_text              : str  : first text
// @param : first_color             : str  : first text color without the #
// @param : first_background_color  : str  : first background color without the #
// @param : logo                    : str  : logo svg content
// @param : logo_color              : str  : logo color without the #
// @param : shadow                  : bool : if the pill has shadows on text & logo
// @param : pillng                  : str  : if the pill will be a png ( text must be lower )
// @param : scale                   : int  : scale for the image size
//
export function one_pill(first_text, first_color, first_background_color, logo, logo_color, shadow, pillng=false, scale=1) {
  // Format colors
  first_color = `#${first_color}`;
  const gradient_start = adjustColor(`#${first_background_color}`, 20);
  const gradient_end = adjustColor(`#${first_background_color}`, -20);

  // Dimensions and styling
  const height = 22;
  const radius = 5;
  const logoWidth = 24;
  const logoAimedSize = logo ? 18 : 0;
  const pillngBonusHeight = pillng ? 3 : 0;
  const scaleFactor = logoAimedSize / logoWidth;
  const textWidth = getTextWidth(first_text);
  let width = textWidth + pill_padding + logoAimedSize + (logo ? 5 : 0);

  const rect = `
    <rect 
      width="${width}"
      height="${height}"
      rx="${radius}"
      ry="${radius}"
      fill="url(#first_gradient)"
      stroke="0"
      stroke-width="0"
    />
  `;

  // Logo handling
  let logoFinal = '';
  if (logo) {
    logoFinal = `
      <g transform="scale(${scaleFactor}) translate(${(-width / 2) + logoAimedSize}, 3)">
        ${logo.replace('<svg', `<svg fill="${logo_color}"`)}
      </g>
    `;
  }

  // Shadows handling
  let logoShadowFinal = '';
  let textShadow = '';
  if (shadow) {
    const textShadowColor = adjustColor(first_color, -100);
    textShadow = `
      <text
        x="${(width / 2) + (logoAimedSize / 2)}"
        y="57%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="${textShadowColor}"
        font-size="12"
        font-family="Arial"
      >
        ${first_text}
      </text>
    `;
    if (logo) {
      const logoShadowColor = adjustColor(logo_color, -100);
      logoShadowFinal = `
        <g transform="scale(${scaleFactor}) translate(${(-width / 2) + logoAimedSize}, 3.8)">
          ${logo.replace('<svg', `<svg fill="${logoShadowColor}"`)}
        </g>
      `;
    }
  }

  // Main text
  const mainText = `
    <g transform="translate(${(width / 2) + (logoAimedSize / 2)}, ${height / 2 + 1 + pillngBonusHeight})">
      <text
        dominant-baseline="middle"
        text-anchor="middle"
        fill="${first_color}"
        font-size="12"
        font-family="Arial"
      >
        ${first_text}
      </text>
    </g>
  `;

  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width * scale}" height="${height * scale}" xmlns="http://www.w3.org/2000/svg">
      ${createGradient('first_gradient', gradient_start, gradient_end)}
      ${rect}
      ${logoShadowFinal}
      ${logoFinal}
      ${textShadow}
      ${mainText}
    </svg>
  `;
}