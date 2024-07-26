/*
  Warnings:

  - Added the required column `status` to the `ComprasCliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComprasCliente" ADD COLUMN     "status" BOOLEAN NOT NULL;
