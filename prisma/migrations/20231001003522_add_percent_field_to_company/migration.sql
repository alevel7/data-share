-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "numberOfUsers" INTEGER NOT NULL,
    "numberOfProducts" INTEGER NOT NULL,
    "logo" TEXT,
    "Percentage" DECIMAL NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("createdAt", "id", "logo", "name", "numberOfProducts", "numberOfUsers", "userId") SELECT "createdAt", "id", "logo", "name", "numberOfProducts", "numberOfUsers", "userId" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");
CREATE INDEX "Company_name_idx" ON "Company"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
