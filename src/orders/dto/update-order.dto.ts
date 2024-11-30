/* eslint-disable prettier/prettier */
// src/orders/dto/update-order.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

  @IsString()
  @IsOptional()
  description?: string; // Optional description field
}
