/* eslint-disable prettier/prettier */
// src/bills/dto/create-bill.dto.ts
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateBillDto {
  @IsNumber()
  orderId: number;

  @IsNumber()
  amount: number;

  @IsDateString()
  dueDate: string;

  @IsString()
  @IsOptional()
  description?: string; // Optional description field
}
