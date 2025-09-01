-- CreateTable
CREATE TABLE "PlanoAtivo" (
    "cod" TEXT NOT NULL PRIMARY KEY,
    "codAssinatura" TEXT NOT NULL,
    "dataUltimoStatus" DATETIME NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY ("codAssinatura") REFERENCES "Subscription" ("cod") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanoAtivo_codAssinatura_key" ON "PlanoAtivo"("codAssinatura");