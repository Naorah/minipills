import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { ENV } from '$env/static/private';

//
//
// Update daily stats
//
//
async function updateDailyPillStats(type) {
  if (ENV === "DEV") return;
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));

  // Vérifie si des statistiques existent pour aujourd'hui
  let stats = await prisma.dailyPillStats.findFirst({
    where: { 
      date: startOfDay, 
      type: type
    }
  });

  if (stats) {
    // Incrémente le compteur
    await prisma.dailyPillStats.update({
      where: {
        date_type: {
          date: startOfDay,
          type: type,
        },
      },
      data: { count: { increment: 1 } },
    });
  } else {
    // Crée des statistiques pour aujourd'hui
    await prisma.dailyPillStats.create({
      data: { date: startOfDay, count: 1, type: type },
    });
  }
}

//
//
// get daily stats
//
//
async function getDailyPillStats(date) {
  // get the start of day
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));

  // daily pill stats
  const stats = await prisma.dailyPillStats.findMany({
    where: {date: startOfDay}
  });

  // stats
  return stats || { date: startOfDay, count: 0 };
}

// export different functions
export { getDailyPillStats };
export { updateDailyPillStats }