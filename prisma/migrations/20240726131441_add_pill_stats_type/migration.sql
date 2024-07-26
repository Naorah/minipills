-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyPillStats" (
    "date" DATETIME NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'svg'
);
INSERT INTO "new_DailyPillStats" ("count", "date") SELECT "count", "date" FROM "DailyPillStats";
DROP TABLE "DailyPillStats";
ALTER TABLE "new_DailyPillStats" RENAME TO "DailyPillStats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
