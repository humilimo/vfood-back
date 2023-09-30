-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Colaborator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "grade" REAL
);
INSERT INTO "new_Colaborator" ("area", "grade", "id", "name") SELECT "area", "grade", "id", "name" FROM "Colaborator";
DROP TABLE "Colaborator";
ALTER TABLE "new_Colaborator" RENAME TO "Colaborator";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
