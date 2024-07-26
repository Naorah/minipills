import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET({ url }) {
  // Extraction des paramètres de requête
  const day = url.searchParams.get('day');
  const month = url.searchParams.get('month');
  const year = url.searchParams.get('year');

  // If no month/year
  if (!day || !month || !year) {
    return new Response(
      JSON.stringify({ error: 'Month and year are required' }),
      { status: 400 }
    );
  }

  // Create the right amounts
  const last_year = new Date(year-1, month, day);

  try {
    // Récupère les statistiques journalières par type
    const statsByType = await prisma.dailyPillStats.findMany({
      where: {
        date: {
          gte: last_year,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Calcul des statistiques totales
    const totalStats = statsByType.reduce((acc, stat) => {
      const date = stat.date.toISOString().split('T')[0];
      if (!acc[date]) acc[date] = 0;
      acc[date] += stat.count;
      return acc;
    }, {});

    // Préparer les données pour la réponse
    const dataByType = {};
    statsByType.forEach(stat => {
      if (!dataByType[stat.type]) {
        dataByType[stat.type] = [];
      }
      dataByType[stat.type].push({ date: stat.date.toISOString().split('T')[0], count: stat.count });
    });

    return new Response(JSON.stringify({
      byType: dataByType,
      total: Object.keys(totalStats).map(date => ({ date, count: totalStats[date] }))
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}