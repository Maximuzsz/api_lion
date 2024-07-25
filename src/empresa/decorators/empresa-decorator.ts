import { applyDecorators, Controller, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

export const EmpresaDecorator =() =>{
    return applyDecorators(
        Controller('empresa'),
        ApiBearerAuth(),
        UseGuards(JwtAuthGuard),
        ApiTags('Empresa')
    );
}