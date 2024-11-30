/* eslint-disable prettier/prettier */
// src/bills/bills.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  // Create a new bill
  @Post()
  async create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  // Get all bills
  @Get()
  async findAll() {
    return this.billsService.findAll();
  }

  // Get a bill by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.billsService.findOne(id);
  }

  // Update a bill by ID
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(id, updateBillDto);
  }

  // Delete a bill by ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.billsService.remove(id);
  }
}
