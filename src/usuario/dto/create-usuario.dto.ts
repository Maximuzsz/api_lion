import {
    IsString
  } from 'class-validator';
import { Usuario } from '../entities/usuario.entity';

  
  export class CreateUsuarioDto extends Usuario{
    @IsString()
    userName: string;
  
    @IsString()
    password: string;
  
    @IsString()
    name: string;
    
    @IsString()
    empresa_id: string;
  }