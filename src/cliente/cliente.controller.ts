import { Body, Get, HttpException, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDecorator } from './decorators/cliente-decorator';
import { ClienteCreateDecorator } from './decorators/cliente-decorator-create';
import { ClienteDecoratorUpdate } from './decorators/cliente-decorator-update';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Logger } from "@nestjs/common";

@ClienteDecorator()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
  private readonly logger = new Logger(ClienteController.name);

  @ClienteCreateDecorator()
  @Post()
  async create(@Body() cliente: CreateClienteDto) {
    try {
      this.logger.log('Recebendo dados para criar um novo cliente', JSON.stringify(cliente));

      // Validação extra se necessário
      if (!cliente.nome || !cliente.usuario_id) {
        this.logger.warn('Dados inválidos fornecidos para criação do cliente');
        throw new HttpException('Nome e ID do usuário são obrigatórios.', HttpStatus.BAD_REQUEST);
      }

      const novoCliente = await this.clienteService.create(cliente);

      this.logger.log(`Cliente criado com sucesso`);
      return {
        message: 'Cliente criado com sucesso',
        data: novoCliente,
      };
    } catch (error) {
      this.logger.error('Erro ao criar cliente', error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro ao criar o cliente. Tente novamente mais tarde.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  getAll(){
    return this.clienteService.getAll()
  }

  @ClienteDecoratorUpdate()
  async update(@Param('cliente_id') cliente_id: string, @Body() cliente: UpdateClienteDto){
    try {
      this.logger.log('Recebendo dados para atualizar o cliente', JSON.stringify(cliente));
      this.logger.log(cliente.nome);

      // Validação extra se necessário
      if (!cliente.nome) {
        this.logger.warn('Dados inválidos fornecidos para atualizar o cliente');
        throw new HttpException('Nome e ID do usuário são obrigatórios.', HttpStatus.BAD_REQUEST);
      }

      const novoCliente = await this.clienteService.update(cliente_id,cliente);

      this.logger.log(`Cliente atualizado com sucesso`);
      return {
        message: 'Cliente atualizado com sucesso',
        data: novoCliente,
      };
    } catch (error) {
      this.logger.error('Erro ao atualizar cliente', error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro ao atualizar o cliente. Tente novamente mais tarde.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


}
