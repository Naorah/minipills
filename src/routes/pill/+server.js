// GENERATOR IMPORT
import { one_pill } from '$lib/OnePill.js';
import { two_pills } from '$lib/TwoPills.js';
// PRISMA IMPORT
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


//
// isHexColor : function : tell if the given color is hexadecimal
//
function isHexColor(str) {
  const hexColorPattern = /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  return hexColorPattern.test(str);
}

async function getLogoByName(name) {
  try {
    const logoRecord = await prisma.logo.findUnique({
      where: {
        name: name,
      },
      select: {
        logo: true,
      },
    });

    if (logoRecord) {
      return logoRecord.logo;
    } else {
      console.log(`Logo not found for name: ${name}`);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving logo:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
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

  // Logo
  let logo_name = url.searchParams.get('l');
  let logo_color = url.searchParams.get('lc');
  let logo_svg;

  // Properties
  let shadow = url.searchParams.get('s') != null ? true : false;

  // Get logo if logo params
  if (logo_name) {
    // Set the basic color to white if no logo_color
    logo_svg = await getLogoByName(logo_name);
    logo_color = logo_color ? "#"+logo_color : "#fff"
  }

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
    svgContent = one_pill(first_text, first_color, first_background_color, logo_svg, logo_color, shadow);
  } else {
    svgContent = two_pills(first_text, first_color, first_background_color, second_text, second_color, second_background_color, logo_svg, logo_color, shadow);
  }

  // return the svg
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  });
}