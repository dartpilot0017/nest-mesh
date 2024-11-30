/* eslint-disable prettier/prettier */
// src/bills/dto/update-bill.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateBillDto {
  @IsString()
  @IsOptional()
  status?: 'unpaid' | 'paid' | 'overdue';

  @IsString()
  @IsOptional()
  description?: string; // Optional description field
}
