import { Body, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { ProdutoDecorator } from './decorators/produto-decorator';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutosService } from './produtos.service';
import { ProddutoDecoratorUpdate } from './decorators/produto-decorator-update';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoCreateDecorator } from './decorators/produto-decorator-create';

@ProdutoDecorator()
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}
  private readonly logger = new Logger(ProdutosController.name);

  @ProdutoCreateDecorator()
  async create(@Body() produto: CreateProdutoDto) {
    try {
      this.logger.log('Recebendo dados para cadastrar o produto', JSON.stringify(produto));
      this.logger.log(produto.nome_produto);

      // Validação extra se necessário
      if (!produto.nome_produto) {
        this.logger.warn('Dados inválidos fornecidos para cadastrar produto');
        throw new HttpException('Dados inválidos fornecidos para cadastrar produto.', HttpStatus.BAD_REQUEST);
      }

      const novoProduto = await this.produtosService.create(produto);

      this.logger.log(`Produto cadastrado com sucesso`);
      return {
        message: 'Produto cadastrado com sucesso',
        data: novoProduto,
      };
    } catch (error) {
      this.logger.error('Erro ao cadastrar produto', error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro ao cadastrar produto. Tente novamente mais tarde.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  getAll() {
    return this.produtosService.getAll()
  }

  @ProddutoDecoratorUpdate()
  async update(@Param('produto_id') produto_id: string, @Body() produto: UpdateProdutoDto) {
    try {
      this.logger.log('Recebendo dados para cadastrar o produto', JSON.stringify(produto));
      this.logger.log(produto.nome_produto);

      const novoProduto = await this.produtosService.update(produto_id,produto);

      this.logger.log(`Produto atualizado com sucesso`);
      return {
        message: 'Produto atualizado com sucesso',
        data: novoProduto,
      };
    } catch (error) {
      this.logger.error('Erro ao atualizar produto', error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro ao atualizar produto. Tente novamente mais tarde.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


}
