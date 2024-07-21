import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const all_logos = await prisma.Logo.findMany({
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