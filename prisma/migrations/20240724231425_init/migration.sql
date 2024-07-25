/*
  Warnings:

  - You are about to drop the column `companyId` on the `VendaDiaria` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `VendaDiaria` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `empresa_id` to the `VendaDiaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `VendaDiaria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropForeignKey
ALTER TABLE "VendaDiaria" DROP CONSTRAINT "VendaDiaria_companyId_fkey";

-- DropForeignKey
ALTER TABLE "VendaDiaria" DROP CONSTRAINT "VendaDiaria_userId_fkey";

-- AlterTable
ALTER TABLE "VendaDiaria" DROP COLUMN "companyId",
DROP COLUMN "userId",
ADD COLUMN     "empresa_id" TEXT NOT NULL,
ADD COLUMN     "usuario_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Empresa" (
    "empresa_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("empresa_id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "empresa_id" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "produto_id" TEXT NOT NULL,
    "nome_produto" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("produto_id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "cliente_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("cliente_id")
);

-- CreateTable
CREATE TABLE "ComprasCliente" (
    "compra_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "data_compra" TIMESTAMP(3) NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "ComprasCliente_pkey" PRIMARY KEY ("compra_id")
);

-- CreateTable
CREATE TABLE "ItensCompra" (
    "item_id" TEXT NOT NULL,
    "compra_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItensCompra_pkey" PRIMARY KEY ("item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_userName_key" ON "Usuario"("userName");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaDiaria" ADD CONSTRAINT "VendaDiaria_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaDiaria" ADD CONSTRAINT "VendaDiaria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComprasCliente" ADD CONSTRAINT "ComprasCliente_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComprasCliente" ADD CONSTRAINT "ComprasCliente_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Clientes"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensCompra" ADD CONSTRAINT "ItensCompra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensCompra" ADD CONSTRAINT "ItensCompra_compra_id_fkey" FOREIGN KEY ("compra_id") REFERENCES "ComprasCliente"("compra_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensCompra" ADD CONSTRAINT "ItensCompra_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produtos"("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE;
