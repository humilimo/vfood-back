-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fazer" (
    "colaboratorID" INTEGER NOT NULL,
    "indicatorID" INTEGER NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0,
    "done" INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY ("colaboratorID", "indicatorID"),
    CONSTRAINT "Fazer_colaboratorID_fkey" FOREIGN KEY ("colaboratorID") REFERENCES "Colaborator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fazer_indicatorID_fkey" FOREIGN KEY ("indicatorID") REFERENCES "Indicator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fazer" ("colaboratorID", "done", "indicatorID", "progress") SELECT "colaboratorID", "done", "indicatorID", "progress" FROM "Fazer";
DROP TABLE "Fazer";
ALTER TABLE "new_Fazer" RENAME TO "Fazer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
