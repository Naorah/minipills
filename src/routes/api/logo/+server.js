import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET({ url }) {
  try {
    // Récupérer les paramètres de requête
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const startswith = url.searchParams.get('startswith') || '';

    // Construire la condition de filtrage
    const filterCondition = startswith
    ? {
        OR: [
          {
            name: {
              startsWith: startswith,
            },
          },
          {
            display_name: {
              startsWith: startswith,
            },
          },
        ],
      }
    : {};

    // Récupérer les enregistrements avec Prisma
    const all_logos = await prisma.Logo.findMany({
      where: filterCondition,
      skip: offset,
      take: limit,
      orderBy: {
        name: 'asc'
      }
    });
    
    return new Response(JSON.stringify(all_logos), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
  }
}