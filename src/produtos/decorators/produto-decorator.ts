import { applyDecorators, Controller, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

export const ProdutoDecorator =() =>{
    return applyDecorators(
        Controller('produtos'),
        ApiBearerAuth(),
        UseGuards(JwtAuthGuard),
        ApiTags('Produtos')
    );
}