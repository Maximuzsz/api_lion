/*
  Warnings:

  - You are about to drop the column `troco` on the `caixaDiario` table. All the data in the column will be lost.
  - You are about to drop the column `valorCartao` on the `caixaDiario` table. All the data in the column will be lost.
  - Added the required column `saida` to the `caixaDiario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDiario` to the `caixaDiario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorCartaoMaquina1` to the `caixaDiario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorCartaoMaquina2` to the `caixaDiario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorFinal` to the `caixaDiario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorentrada` to the `caixaDiario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "caixaDiario" DROP COLUMN "troco",
DROP COLUMN "valorCartao",
ADD COLUMN     "saida" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalDiario" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorCartaoMaquina1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorCartaoMaquina2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorFinal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorentrada" DOUBLE PRECISION NOT NULL;
