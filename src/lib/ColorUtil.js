// PRISMA IMPORT
import { PrismaClient } from '@prisma/client';
import { createCanvas } from 'canvas';

const prisma = new PrismaClient();

//
//
// Get the text width from differents params
// @param : text : text to check
// @param : fontSize : text size
// @param : fontFamily : typo
//
//
export function getTextWidth(text, fontSize=12, fontFamily = 'Arial') {
  // Charger la police
  if (!text) return 0;
  try {
    // Create a canvas element
    const canvas = createCanvas(20000, 200); // width and height can be arbitrary
    const context = canvas.getContext('2d');

    // Set the font properties
    context.font = `${fontSize}px ${fontFamily}`;

    // Measure the text width
    const metrics = context.measureText(text);
    return metrics.width;
  } catch (error) {
    console.log(error);
    return 0.55 * fontSize * text.length;
  }
}

//
// Adjust color in rgb with the adjustment delta
// @param : color : base color to process
// @param : adjustment : delta
//
export function adjustColor(color, adjustment) {
  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  };

  // Convert RGB color to hex
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  // Adjust the color
  const [r, g, b] = hexToRgb(color);
  const rAdjusted = Math.min(255, Math.max(0, r + adjustment));
  const gAdjusted = Math.min(255, Math.max(0, g + adjustment));
  const bAdjusted = Math.min(255, Math.max(0, b + adjustment));

  return rgbToHex(rAdjusted, gAdjusted, bAdjusted);
}

//
// isHexColor : function : tell if the given color is hexadecimal
// @param : str : color to check
//
export function isHexColor(str) {
  const hexColorPattern = /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  return hexColorPattern.test(str);
}

export async function getLogoSvgByName(name) {
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

//
//
// Retrieve the logo by name
// @param : name : name of the logo
//
//
export async function getLogoByName(name) {
  try {
    const logoRecord = await prisma.logo.findUnique({
      where: {
        name: name,
      }
    });

    if (logoRecord) {
      return logoRecord;
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

//
//
// Get the final text to build, with the _ treatement
// if __ then it's a _
// if _ then it's a space
// @param : text : text to process
//
export function getFinalText(text) {
  if (text) {
    const spaced_text = text.replaceAll('_', ' ');
    const final_text = spaced_text.replaceAll('  ', '_');
    return final_text;
  } else {
    return text;
  }
  
}