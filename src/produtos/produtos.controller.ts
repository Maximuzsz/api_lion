import { Body, Get, Param } from '@nestjs/common';
import { ProdutoDecorator } from './decorators/produto-decorator';
import { ProdutoCreateDecorator } from './decorators/produto-decorator-create';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutosService } from './produtos.service';
import { ProddutoDecoratorUpdate } from './decorators/produto-decorator-update';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@ProdutoDecorator()
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}


  @ProdutoCreateDecorator()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  getAll() {
    return this.produtosService.getAll()
  }

  @Get('falta')
  getFalta() {
    return this.produtosService.getFalta()
  }

  @ProddutoDecoratorUpdate()
  update(@Param('produto_id') produto_id: string, @Body() produto: UpdateProdutoDto) {
    return this.produtosService.update(produto_id, produto)
  }


}
