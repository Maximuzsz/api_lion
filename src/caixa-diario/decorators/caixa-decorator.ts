import { applyDecorators, Controller, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

export const CaixaDecorator =() =>{
    return applyDecorators(
        Controller('vendas'),
        ApiBearerAuth(),
        UseGuards(JwtAuthGuard),
        ApiTags('Vendas')
    );
}