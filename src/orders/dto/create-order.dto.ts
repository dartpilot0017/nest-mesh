/* eslint-disable prettier/prettier */
// src/orders/dto/create-order.dto.ts
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  quoteId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  totalAmount: number;

  @IsString()
  @IsOptional()
  description?: string; // Optional description field
}
