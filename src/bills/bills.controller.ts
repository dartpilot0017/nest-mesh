/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('bills')
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  // Create a new bill
  @Post()
  @ApiOperation({ summary: 'Create a new bill' })
  @ApiResponse({
    status: 201,
    description: 'The bill has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data.',
  })
  async create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  // Get all bills
  @Get()
  @ApiOperation({ summary: 'Get all bills' })
  @ApiResponse({
    status: 200,
    description: 'The list of bills has been successfully retrieved.',
  })
  async findAll() {
    return this.billsService.findAll();
  }

  // Get a bill by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a bill by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bill has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Bill not found.',
  })
  async findOne(@Param('id') id: number) {
    return this.billsService.findOne(id);
  }

  // Update a bill by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update a bill by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bill has been successfully updated.',
  })
  async update(@Param('id') id: number, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(id, updateBillDto);
  }

  // Delete a bill by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bill by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bill has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Bill not found.',
  })
  async remove(@Param('id') id: number) {
    return this.billsService.remove(id);
  }
}
