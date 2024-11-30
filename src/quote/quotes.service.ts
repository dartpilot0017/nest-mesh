/* eslint-disable prettier/prettier */
// src/quotes/quotes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const quote = this.quotesRepository.create(createQuoteDto);
    return await this.quotesRepository.save(quote);
  }

  async findAll(clientId: number): Promise<Quote[]> {
    return await this.quotesRepository.find({ where: { clientId } });
  }

  async findOne(id: number): Promise<Quote> {
    return await this.quotesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const quote = await this.quotesRepository.findOne({ where: { id } });
    if (!quote) {
      throw new Error('Quote not found');
    }
    Object.assign(quote, updateQuoteDto);
    return await this.quotesRepository.save(quote);
  }

  async remove(id: number): Promise<void> {
    const quote = await this.quotesRepository.findOne({ where: { id } });
    if (!quote) {
      throw new Error('Quote not found');
    }
    await this.quotesRepository.remove(quote);
  }
}
