/*
  Warnings:

  - The primary key for the `DailyPillStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DailyPillStats` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyPillStats" (
    "date" DATETIME NOT NULL,
    "count" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'svg',

    PRIMARY KEY ("date", "type")
);
INSERT INTO "new_DailyPillStats" ("count", "date", "type") SELECT "count", "date", "type" FROM "DailyPillStats";
DROP TABLE "DailyPillStats";
ALTER TABLE "new_DailyPillStats" RENAME TO "DailyPillStats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
