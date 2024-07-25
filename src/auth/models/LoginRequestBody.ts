import {  IsString } from 'class-validator';

export class LoginRequestBody {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}