import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type PedidoDocument = HydratedDocument<Pedido>;

@Schema({ timestamps: true }) // Adiciona createdAt e updatedAt automaticamente
export class Pedido {
  @Prop({ type: String, default: uuidv4 }) // Define _id como String e gera um UUID automaticamente
  _id: string;

  @Prop({ required: true })
  clienteId: string;

  @Prop({ required: true, type: Array })
  produtos: { produtoId: string; quantidade: number }[];

  @Prop({ required: true, default: 0 }) // Valor já pago pelo cliente
  valorPago: number;

  @Prop({ default: 'pendente' }) // Status do pedido
  status: string;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
