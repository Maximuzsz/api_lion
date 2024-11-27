import { Injectable, NotFoundException } from '@nestjs/common';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { ItensCompra } from 'src/itens-compra/entities/itens-compra.entity';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ComprasClientesService {
  constructor(private readonly prisma: PrismaService){}

  async create(cliente_id: string, itens: { produto_Id: string; requisitor_nome: string; quantidade: number}[]){
    // Validar cliente
    const cliente = await this.prisma.clientes.findUnique({ where: { cliente_id: cliente_id } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    // Calcular total e criar itens da compra
    let totalCompra = 0;
    let usuario_id = '';

    const itensCompra = await Promise.all(
      itens.map(async (item) => {
        const produto = await this.prisma.produtos.findUnique({ where: { produto_id: item.produto_Id } });
        if (!produto) throw new NotFoundException(`Produto com ID ${item.produto_Id} não encontrado`);
        
        const precoTotalItem = produto.preco * item.quantidade;
        totalCompra += precoTotalItem;
        usuario_id = produto.usuario_id;

        return {
          produto_id: produto.produto_id,
          requisitor_nome: item.requisitor_nome,
          quantidade: item.quantidade,
          precoUnitario: produto.preco,
          precoTotal: precoTotalItem,
          usuario_id: produto.usuario_id
        };
      })
    );

    // Criar compra e itens associados
    return this.prisma.compra.create({
      data: {
        cliente_id,
        total: totalCompra,
        usuario_id: usuario_id,
        itens: {
          create: itensCompra,
        },
      },
      include: {
        itens: true,
      },
    });
  
  }


  async createNewConta(cliente_id: string, userId: string){
    const data = {
      cliente_id,
    }
  }
  async getAll(){
    const contas = await this.prisma.compra.findMany({
      include: {
        cliente: true, // Inclui os dados do cliente associado
        user: true,    // Inclui os dados do usuário (caso necessário)
      },
    });

    const contasFormatadas = contas.map(compra => ({
      id: compra.id,
      cliente_id: compra.cliente_id,
      dataCompra: compra.dataCompra,
      total: compra.total,
      valorPago: compra.valorPago,
      usuario_id: compra.usuario_id,
      usuario_name: compra.user.userName,
      nome_cliente: compra.cliente.nome
    }));
  
    return contasFormatadas;
  }

  async getContasCliente(cliente_id: string) {
    return await  this.prisma.compra.findMany({
      where:{
        cliente_id
      }
    })
  }


  async getCompra(compraId: string) {
    try {
      const compra = await this.prisma.compra.findFirst({
        where: {
          id: compraId,
        },
        include: {
          cliente: true, // Inclui os dados do cliente
          itens: {
            include: {
              produto: true, // Inclui os dados dos produtos nos itens
            },
          },
        },
      });
  
      return compra;
    }catch (error) {
      console.error('Erro ao buscar a compra do cliente:', error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }

  }

  
  
  async gerarPdfConta(contaId: string, empresa_id: string ) {
    const fs = require("fs");

    const data = await  this.getCompra(contaId);
    const empresa = await this.prisma.empresa.findFirst({where: {empresa_id}})
    const logoPath = "src/assets/logo.png";
    try {
      // Cria um novo documento PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]); // Tamanho A4 simplificado
  
      const { width, height } = page.getSize();
      const margin = 50;
  
      // Carregar a logo da empresa
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImage.scale(0.05);
  
      // Adiciona a logo no topo
      const logoX = margin;
      const logoY = height - logoDims.height - margin;
      page.drawImage(logoImage, {
        x: logoX,
        y: logoY,
        width: logoDims.width,
        height: logoDims.height,
      });
  
      // Nome e CNPJ da empresa ao lado da logo
      const empresaNome = empresa.name;
      const empresaCNPJ = "CNPJ: 12.345.678/0001-99";
      const contato = "(62) 99233-3273"
  
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontSize = 10;
      const textX = logoX + logoDims.width + 20; // Alinhado ao lado da logo
      const textY = logoY + logoDims.height - fontSize; // Mesma altura que a logo
  
      page.drawText(empresaNome, { x: textX, y: textY, size: fontSize, font });
      page.drawText(empresaCNPJ, { x: textX, y: textY - 15, size: fontSize, font });
      page.drawText("Contato: "+contato, { x: textX, y: textY - 30, size: fontSize, font });

      page.drawText("Cliente: "+data.cliente.nome, { x: margin, y: height - logoDims.height - margin - 30, size: fontSize, font });
  
      // Adiciona título para os itens
      page.drawText("Itens da Compra:", { x: margin, y: logoY - 50, size: fontSize });
  
      // Configura a tabela
      let tableStartY = logoY - 70;
      const tableLineHeight = 20;
  
      // Desenha cabeçalho da tabela
      const headers = ["Produto", "Marca", "Quantidade", "Valor Unitário", "Valor Total"];
      headers.forEach((header, i) => {
        page.drawText(header, {
          x: margin + i * 100,
          y: tableStartY,
          size: fontSize,
        });
      });
  
      tableStartY -= tableLineHeight;
  
      // Adiciona os itens na tabela
      data.itens.forEach((item) => {
        const { produto, quantidade, precoUnitario, precoTotal } = item;
  
        const row = [
          produto.nome_produto,
          produto.marca || "N/A",
          quantidade.toString(),
          `R$ ${precoUnitario.toFixed(2)}`,
          `R$ ${precoTotal.toFixed(2)}`,
        ];
  
        row.forEach((text, i) => {
          page.drawText(text, {
            x: margin + i * 100,
            y: tableStartY,
            size: fontSize - 2,
          });
        });
  
        tableStartY -= tableLineHeight;
      });
  
      // Adiciona o valor total da compra no final da tabela
      const totalText = `Total da Compra: R$ ${data.total.toFixed(2)}`;
      page.drawText(totalText, {
        x: margin +300,
        y: tableStartY - 20,
        size: fontSize,
        font,
      });
  
      // Salva o PDF
      const pdfBytes = await pdfDoc.save();
    return pdfBytes;
    }  catch (error) {
      console.error("Erro ao gerar PDF:", error);
      throw error;
    }

    
  }

}
