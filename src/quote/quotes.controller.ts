/* eslint-disable prettier/prettier */
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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quote' })
  @ApiResponse({
    status: 201,
    description: 'The quote has been successfully created.',
  })
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    return await this.quotesService.create(createQuoteDto);
  }

  @Get(':clientId')
  @ApiOperation({ summary: 'Get all quotes for a client' })
  @ApiResponse({
    status: 200,
    description: 'The list of quotes has been successfully retrieved.',
  })
  async findAll(@Param('clientId') clientId: number) {
    return await this.quotesService.findAll(clientId);
  }

  @Get('details/:id')
  @ApiOperation({ summary: 'Get a quote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The quote has been successfully retrieved.',
  })
  async findOne(@Param('id') id: number) {
    return await this.quotesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a quote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The quote has been successfully updated.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ) {
    return await this.quotesService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The quote has been successfully deleted.',
  })
  async remove(@Param('id') id: number) {
    await this.quotesService.remove(id);
    return { message: 'Quote deleted successfully' };
  }
}
