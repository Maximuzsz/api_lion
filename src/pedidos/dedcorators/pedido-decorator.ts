import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

export const PedidoDecorator = () => {
  return applyDecorators(
    Controller('pedido'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    ApiTags('Pedido'),
  );
};
