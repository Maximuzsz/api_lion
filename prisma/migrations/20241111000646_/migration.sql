/*
  Warnings:

  - Added the required column `fechado` to the `caixaDiario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "marca" TEXT;

-- AlterTable
ALTER TABLE "caixaDiario" ADD COLUMN     "fechado" BOOLEAN NOT NULL;
