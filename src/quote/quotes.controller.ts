/* eslint-disable prettier/prettier */
// src/quotes/quotes.controller.ts
import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
  } from '@nestjs/common';
  import { QuotesService } from './quotes.service';
  import { CreateQuoteDto } from './dto/create-quote.dto';
  import { UpdateQuoteDto } from './dto/update-quote.dto';
  
  @Controller('quotes')
  export class QuotesController {
    constructor(private readonly quotesService: QuotesService) {}
  
    @Post()
    async create(@Body() createQuoteDto: CreateQuoteDto) {
      return await this.quotesService.create(createQuoteDto);
    }
  
    @Get(':clientId')
    async findAll(@Param('clientId') clientId: number) {
      return await this.quotesService.findAll(clientId);
    }
  
    @Get('details/:id')
    async findOne(@Param('id') id: number) {
      return await this.quotesService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updateQuoteDto: UpdateQuoteDto,
    ) {
      return await this.quotesService.update(id, updateQuoteDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number) {
      await this.quotesService.remove(id);
      return { message: 'Quote deleted successfully' };
    }
  }
  