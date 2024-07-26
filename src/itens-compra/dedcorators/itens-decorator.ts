import { applyDecorators, Controller, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

export const ItensDecorator =() =>{
    return applyDecorators(
        Controller('itens'),
        ApiBearerAuth(),
        UseGuards(JwtAuthGuard),
        ApiTags('Itens')
    );
}