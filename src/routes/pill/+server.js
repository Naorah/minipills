import { one_pill } from '$lib/OnePill.js';
import { two_pills } from '$lib/TwoPills.js';

//
// isHexColor : function : tell if the given color is hexadecimal
//
function isHexColor(str) {
  const hexColorPattern = /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  return hexColorPattern.test(str);
}

export async function GET({ url }) {
  // If errors
  let error = false;
  // If one or two pills
  let is_one_pill = true;
  // First pill
  let first_text = url.searchParams.get('1t');
  let first_color = url.searchParams.get('1c');
  let first_background_color = url.searchParams.get('1bc');

  // Second pill
  let second_text = url.searchParams.get('2t');
  let second_color = url.searchParams.get('2c');
  let second_background_color = url.searchParams.get('2bc');

  // Check params
  if (!first_text) {
    error = true
  }
  if (first_text && second_text) {
    is_one_pill = false
  }
  if (!isHexColor(first_background_color)) {
    first_background_color = "212121";
    // console.log('no first background color')
  }
  if (!isHexColor(first_color)) {
    first_color = "ffffff";
    // console.log('no first color')
  }
  if (!isHexColor(second_background_color)) {
    second_background_color = "a12613";
    // console.log('no second background color')
  }
  if (!isHexColor(second_color)) {
    second_color = "ffffff";
    // console.log('no second color')
  }

  // SVG generator
  let svgContent;

  // generate SVG
  if (error) {
    svgContent = two_pills("404", "ffffff", "212121", "Pill spreader misused", "ffffff", "a12613");
  } else if (is_one_pill) {
    svgContent = one_pill(first_text, first_color, first_background_color);
  } else {
    svgContent = two_pills(first_text, first_color, first_background_color, second_text, second_color, second_background_color);
  }

  // return the svg
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  });
}