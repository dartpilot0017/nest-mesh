/* eslint-disable prettier/prettier */
// src/reports/reports.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async generateReport(@Body() reportDetails: any) {
    return await this.reportsService.generateReport(reportDetails);
  }

  @Get(':id')
  async getReport(@Param('id') id: number) {
    return await this.reportsService.getReport(id);
  }

  @Get()
  async getAllReports() {
    return await this.reportsService.getAllReports();
  }
}
