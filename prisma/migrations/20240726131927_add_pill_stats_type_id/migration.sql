/*
  Warnings:

  - The primary key for the `DailyPillStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `DailyPillStats` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyPillStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "count" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'svg'
);
INSERT INTO "new_DailyPillStats" ("count", "date", "type") SELECT "count", "date", "type" FROM "DailyPillStats";
DROP TABLE "DailyPillStats";
ALTER TABLE "new_DailyPillStats" RENAME TO "DailyPillStats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
