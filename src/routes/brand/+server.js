// isHexColor
import { isHexColor, getLogoByName } from '$lib/ColorUtil.js'
import { two_pills } from '$lib/TwoPills.js';
import { updateDailyPillStats } from '$lib/PillStats.js'

// PRISMA IMPORT
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function GET({ url }) {
  // If errors
  let error = false;

  // Logo
  let logo_name = url.searchParams.get('l');
  let logo_color = url.searchParams.get('lc');
  let logo_svg;
  let logo;

  // New pill created !
  await updateDailyPillStats("brand");

  // Get logo if logo params
  if (logo_name) {
    // Set the basic color to white if no logo_color
    logo = await getLogoByName(logo_name);
    logo_svg = logo.logo
    logo_color = isHexColor(logo_color) ? logo_color : logo.color
  } else {
    error = true;
  }

  console.log(logo)

  // init svgContent
  let svgContent;

  // generate SVG
  if (!logo_svg) {
    svgContent = two_pills("404", "ffffff", "212121", "Pill spreader misused", "ffffff", "a12613", null,null,null);
  } else {
    svgContent = logo_svg.replace('<svg', `<svg fill="${logo_color} width="24"`)
  }

  // return the svg
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  });
}