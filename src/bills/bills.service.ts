/* eslint-disable prettier/prettier */
// src/bills/bills.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  // Create a new bill
  async create(createBillDto: CreateBillDto) {
    const bill = this.billRepository.create(createBillDto);
    return await this.billRepository.save(bill);
  }

  // Get all bills
  async findAll() {
    return await this.billRepository.find();
  }

  // Get a single bill by ID
  async findOne(id: number) {
    return await this.billRepository.findOne({ where: { id } });
  }

  // Update a bill's status
  async update(id: number, updateBillDto: UpdateBillDto) {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) {
      throw new Error('Bill not found');
    }
    Object.assign(bill, updateBillDto);
    return await this.billRepository.save(bill);
  }

  // Delete a bill
  async remove(id: number) {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) {
      throw new Error('Bill not found');
    }
    return await this.billRepository.remove(bill);
  }
}
