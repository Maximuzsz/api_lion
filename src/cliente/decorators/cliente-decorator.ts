import { applyDecorators, Controller, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

export const ClienteDecorator =() =>{
    return applyDecorators(
        Controller('cliente'),
        ApiBearerAuth(),
        UseGuards(JwtAuthGuard),
        ApiTags('Cliente')
    );
}