-- CreateTable
CREATE TABLE "Validator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "userAuthToken" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Validator_username_key" ON "Validator"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Validator_userAuthToken_key" ON "Validator"("userAuthToken");
