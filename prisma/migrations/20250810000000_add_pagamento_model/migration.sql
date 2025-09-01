-- CreateTable
CREATE TABLE "Pagamento" (
    "cod" TEXT NOT NULL PRIMARY KEY,
    "dia" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "codAssinatura" TEXT NOT NULL,
    "valorPago" REAL NOT NULL,
    "dataPagamento" DATETIME NOT NULL,
    FOREIGN KEY ("codAssinatura") REFERENCES "Subscription" ("cod") ON DELETE RESTRICT ON UPDATE CASCADE
);