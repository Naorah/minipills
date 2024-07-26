-- DropIndex
DROP INDEX "LogoSubmission_name_key";

-- CreateTable
CREATE TABLE "DailyPillStats" (
    "date" DATETIME NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Logo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "color" TEXT NOT NULL DEFAULT '#00000'
);
INSERT INTO "new_Logo" ("color", "createdAt", "display_name", "id", "logo", "name") SELECT "color", "createdAt", "display_name", "id", "logo", "name" FROM "Logo";
DROP TABLE "Logo";
ALTER TABLE "new_Logo" RENAME TO "Logo";
CREATE UNIQUE INDEX "Logo_name_key" ON "Logo"("name");
CREATE UNIQUE INDEX "Logo_logo_key" ON "Logo"("logo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
