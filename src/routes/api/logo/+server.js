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

export async function POST({ request, cookies }) {
  try {
    const csrfToken = request.headers.get('x-csrf-token');
    const cookieToken = cookies.get('csrfToken');

    if (csrfToken !== cookieToken) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const display_name = formData.get('display_name');
    const logoFile = formData.get('logo');
    const color = formData.get('color');
    const discord = formData.get('discord');

    // Extract svg content
    const logo = await logoFile.text();

    // Submit the new logo
    const newLogoSubmission = await prisma.logoSubmission.create({
      data: {
        name,
        display_name,
        logo,
        color,
        discord,
      },
    });

    return new Response(JSON.stringify(newLogoSubmission), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error: Text Naorah for support' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}