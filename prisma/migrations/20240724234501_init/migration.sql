/*
  Warnings:

  - You are about to drop the `VendaDiaria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VendaDiaria" DROP CONSTRAINT "VendaDiaria_empresa_id_fkey";

-- DropForeignKey
ALTER TABLE "VendaDiaria" DROP CONSTRAINT "VendaDiaria_usuario_id_fkey";

-- DropTable
DROP TABLE "VendaDiaria";

-- CreateTable
CREATE TABLE "caixaDiario" (
    "caixa_id" TEXT NOT NULL,
    "valorCartao" DOUBLE PRECISION NOT NULL,
    "valorDinheiro" DOUBLE PRECISION NOT NULL,
    "valorPix" DOUBLE PRECISION NOT NULL,
    "troco" DOUBLE PRECISION NOT NULL,
    "dataLancamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "empresa_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "caixaDiario_pkey" PRIMARY KEY ("caixa_id")
);

-- AddForeignKey
ALTER TABLE "caixaDiario" ADD CONSTRAINT "caixaDiario_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caixaDiario" ADD CONSTRAINT "caixaDiario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
