-- CreateTable
CREATE TABLE "Subscription" (
    "cod" TEXT NOT NULL PRIMARY KEY,
    "codPlano" TEXT NOT NULL,
    "codCli" TEXT NOT NULL,
    "inicioFidelidade" DATETIME NOT NULL,
    "fimFidelidade" DATETIME NOT NULL,
    "dataUltimoPagamento" DATETIME NOT NULL,
    "custoFinal" REAL NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "Subscription_codCli_fkey" FOREIGN KEY ("codCli") REFERENCES "Client" ("cod") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_codPlano_fkey" FOREIGN KEY ("codPlano") REFERENCES "Plan" ("cod") ON DELETE RESTRICT ON UPDATE CASCADE
);
