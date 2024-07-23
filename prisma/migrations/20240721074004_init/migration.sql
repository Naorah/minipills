-- CreateTable
CREATE TABLE "Logo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LogoSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validatedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Logo_name_key" ON "Logo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Logo_logo_key" ON "Logo"("logo");

-- CreateIndex
CREATE UNIQUE INDEX "LogoSubmission_name_key" ON "LogoSubmission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LogoSubmission_logo_key" ON "LogoSubmission"("logo");
