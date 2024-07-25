import { applyDecorators, Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

export const AuthDecorator=() =>{
    return applyDecorators(
        ApiTags('Logon'),
        Controller()
    )
}