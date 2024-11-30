/* eslint-disable prettier/prettier */
// src/reports/reports.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  private reports = [];

  async generateReport(reportDetails: any) {
    const newReport = {
      id: this.reports.length + 1,
      ...reportDetails,
      createdAt: new Date(),
    };
    this.reports.push(newReport);
    return newReport;
  }

  async getReport(id: number) {
    const report = this.reports.find((report) => report.id === id);
    if (!report) {
      throw new Error('Report not found');
    }
    return report;
  }

  async getAllReports() {
    return this.reports;
  }
}
