/*
  Warnings:

  - Added the required column `color` to the `LogoSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `LogoSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Logo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL DEFAULT '',
    "logo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "color" TEXT NOT NULL DEFAULT '#00000'
);
INSERT INTO "new_Logo" ("id", "logo", "name") SELECT "id", "logo", "name" FROM "Logo";
DROP TABLE "Logo";
ALTER TABLE "new_Logo" RENAME TO "Logo";
CREATE UNIQUE INDEX "Logo_name_key" ON "Logo"("name");
CREATE UNIQUE INDEX "Logo_logo_key" ON "Logo"("logo");
CREATE TABLE "new_LogoSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validatedAt" DATETIME
);
INSERT INTO "new_LogoSubmission" ("createdAt", "discord", "id", "logo", "name", "validatedAt") SELECT "createdAt", "discord", "id", "logo", "name", "validatedAt" FROM "LogoSubmission";
DROP TABLE "LogoSubmission";
ALTER TABLE "new_LogoSubmission" RENAME TO "LogoSubmission";
CREATE UNIQUE INDEX "LogoSubmission_name_key" ON "LogoSubmission"("name");
CREATE UNIQUE INDEX "LogoSubmission_logo_key" ON "LogoSubmission"("logo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
