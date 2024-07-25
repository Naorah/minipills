// PRISMA IMPORT
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// GENERATOR IMPORT
import { one_pill } from '$lib/OnePill.js';
import { two_pills } from '$lib/TwoPills.js';

//
// Premade pill generator
//
export async function premadePill(brand_name) {
  try {
    // Construire la condition de filtrage
    const filterCondition = 
      {
        name: {
          equals: brand_name,
        },
      }

    // Récupérer les enregistrements avec Prisma
    let logo = await prisma.Logo.findMany({
      where: filterCondition
    });

    // if no logo then the brand_name don't exist
    if (logo.length == 0) {
      return two_pills("404", "ffffff", "212121", "No premade logo with this name", "ffffff", "a12613");
    }

    // extract the one to build
    logo = logo[0]
    
    // build the one pill with the color name & logo
    return one_pill(logo.display_name, "ffffff", logo.color.replace('#', ''), logo.logo, "#ffffff", null);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
  }
}