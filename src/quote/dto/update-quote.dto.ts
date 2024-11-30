/* eslint-disable prettier/prettier */
// src/quotes/dto/update-quote.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateQuoteDto {
  @IsString()
  @IsOptional()
  status?: 'pending' | 'accepted' | 'rejected';

  @IsString()
  @IsOptional()
  propertyDetails?: string;

  @IsString()
  @IsOptional()
  additionalNotes?: string;

  @IsString()
  @IsOptional()
  description?: string; // Optional description
}
