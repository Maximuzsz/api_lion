-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EM_FALTA', 'EM_ESTOQUE', 'PEDIDO');

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
CREATE TABLE "caixaDiario" (
    "caixa_id" TEXT NOT NULL,
    "valorCartaoMaquina1" DOUBLE PRECISION NOT NULL,
    "valorCartaoMaquina2" DOUBLE PRECISION NOT NULL,
    "valorDinheiro" DOUBLE PRECISION NOT NULL,
    "valorPix" DOUBLE PRECISION NOT NULL,
    "valorentrada" DOUBLE PRECISION NOT NULL,
    "valorFinal" DOUBLE PRECISION NOT NULL,
    "saida" DOUBLE PRECISION NOT NULL,
    "totalDiario" DOUBLE PRECISION NOT NULL,
    "dataLancamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "empresa_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "fechado" BOOLEAN NOT NULL,

    CONSTRAINT "caixaDiario_pkey" PRIMARY KEY ("caixa_id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "produto_id" TEXT NOT NULL,
    "nome_produto" TEXT NOT NULL,
    "preco" DOUBLE PRECISION,
    "marca" TEXT,
    "status" "Status" NOT NULL DEFAULT 'EM_ESTOQUE',
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
    "data_compra" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL,
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
ALTER TABLE "caixaDiario" ADD CONSTRAINT "caixaDiario_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caixaDiario" ADD CONSTRAINT "caixaDiario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
