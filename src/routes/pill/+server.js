// GENERATOR IMPORT
import { one_pill } from '$lib/OnePill.js';
import { two_pills } from '$lib/TwoPills.js';
import { three_pills } from '$lib/ThreePills.js';
import { premadePill } from '$lib/PremadePill.js';
import { updateDailyPillStats } from '$lib/PillStats.js'

// isHexColor
import { isHexColor, getLogoSvgByName } from '$lib/ColorUtil.js'

// PRISMA IMPORT
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getLogoSvgByName(name) {
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
  let is_one_pill = false;
  let is_two_pill = false;

  // First pill
  let first_text = url.searchParams.get('1t');
  let first_color = url.searchParams.get('1c');
  let first_background_color = url.searchParams.get('1bc');

  // Second pill
  let second_text = url.searchParams.get('2t');
  let second_color = url.searchParams.get('2c');
  let second_background_color = url.searchParams.get('2bc');

  // Third pill
  let third_text = url.searchParams.get('3t');
  let third_color = url.searchParams.get('3c');
  let third_background_color = url.searchParams.get('3bc');

  // Logo
  let logo_name = url.searchParams.get('l');
  let logo_color = url.searchParams.get('lc');
  let logo_svg;

  // Properties
  let shadow = url.searchParams.get('s') != null ? true : false;
  let pillng = url.searchParams.get('pillng') != null ? true : false;

  // New pill created !
  if (!pillng) {
    await updateDailyPillStats("svg");
  }

  // Premade
  let premade = url.searchParams.get("premade")
  if (premade) {
    const pill = await premadePill(premade, pillng);
    // return the svg
    return new Response(pill, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });
  }

  // Get logo if logo params
  if (logo_name) {
    // Set the basic color to white if no logo_color
    logo_svg = await getLogoSvgByName(logo_name);
    logo_color = logo_color ? "#"+logo_color : "#fff"
  }

  // Check params
  if (!first_text) {
    error = true
  }
  if (first_text && !second_text) {
    is_one_pill = true;
  } else if (first_text && second_text && !third_text) {
    is_two_pill = true;
  }

  // Base color handler
  if (!isHexColor(first_background_color)) {
    first_background_color = "212121";
  }
  if (!isHexColor(first_color)) {
    first_color = "ffffff";
  }
  if (!isHexColor(second_background_color)) {
    second_background_color = "a12613";
  }
  if (!isHexColor(second_color)) {
    second_color = "ffffff";
  }
  if (!isHexColor(third_background_color)) {
    third_background_color = "212121";
  }
  if (!isHexColor(third_color)) {
    third_color = "ffffff";
  }

  // SVG generator
  let svgContent;

  // generate SVG
  if (error) {
    svgContent = two_pills("404", "ffffff", "212121", "Pill spreader misused", "ffffff", "a12613", null,null,null, pillng=pillng);
  } else if (is_one_pill) {
    
    svgContent = one_pill(first_text, first_color, first_background_color, logo_svg, logo_color, shadow, pillng);
  } else if (is_two_pill) {
    svgContent = two_pills(first_text, first_color, first_background_color, second_text, second_color, second_background_color, logo_svg, logo_color, shadow, pillng);
  } else {
    svgContent = three_pills(first_text, first_color, first_background_color, second_text, second_color, second_background_color, third_text, third_color, third_background_color, logo_svg, logo_color, shadow, pillng);
  }

  // return the svg
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  });
}