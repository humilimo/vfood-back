-- CreateTable
CREATE TABLE "Colaborator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "grade" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Indicator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "meta" REAL NOT NULL,
    "supermeta" REAL NOT NULL,
    "desafio" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Fazer" (
    "colaboratorID" INTEGER NOT NULL,
    "indicatorID" INTEGER NOT NULL,
    "progress" REAL NOT NULL,
    "done" INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY ("colaboratorID", "indicatorID"),
    CONSTRAINT "Fazer_colaboratorID_fkey" FOREIGN KEY ("colaboratorID") REFERENCES "Colaborator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fazer_indicatorID_fkey" FOREIGN KEY ("indicatorID") REFERENCES "Indicator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
