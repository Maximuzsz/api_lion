import { applyDecorators, Controller, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

export const CompraDecorator =() =>{
    return applyDecorators(
        Controller('Compra'),
        ApiBearerAuth(),
        UseGuards(JwtAuthGuard),
        ApiTags('Compra')
    );
}