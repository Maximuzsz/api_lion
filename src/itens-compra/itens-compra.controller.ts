import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItensCompraService } from './itens-compra.service';
import { CreateItensCompraDto } from './dto/create-itens-compra.dto';
import { UpdateItensCompraDto } from './dto/update-itens-compra.dto';
import { ItensDecorator } from './dedcorators/itens-decorator';
import { ItensCreateDecorator } from './dedcorators/itens-decorator-create';

@ItensDecorator()
export class ItensCompraController {
  constructor(private readonly itensCompraService: ItensCompraService) {}


  @ItensCreateDecorator()
  crate(itens: CreateItensCompraDto){
    return this.itensCompraService.create(itens)
  }

  
  @Get(':compra_id')
  getCompra(compra_id: string){
    return this.itensCompraService.getItens(compra_id)
  }

}