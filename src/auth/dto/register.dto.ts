/* eslint-disable prettier/prettier */
// src/auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string; // Add name parameter

  @IsString()
  role: 'client' | 'contractor';
}
