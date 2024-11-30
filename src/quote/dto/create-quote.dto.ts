/* eslint-disable prettier/prettier */
// src/quotes/dto/create-quote.dto.ts
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  clientId: number;

  @IsString()
  propertyDetails: string;

  @IsString()
  @IsOptional()
  additionalNotes?: string;

  @IsString()
  @IsOptional()
  description?: string; // Optional description
}
